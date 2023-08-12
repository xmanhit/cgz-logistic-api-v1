import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

class UserService {
  create = async (payload) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    const user = { ...payload, password: hashedPassword };
    return User.create(user);
  };

  findAll = async () => {
    return User.find();
  };

  login = async (payload) => {
    // verify user
    const user = await User.findOne({ email: payload.email });

    if (user) {
      // compare password
      const comparePasswordResult = await bcrypt.compare(
        payload.password,
        user.password
      );

      if (comparePasswordResult) {
        // create token
        const key = process.env.SECRET_KEY;

        const payload = { id: user._id };

        const token = jwt.sign(payload, key, {
          algorithm: "HS256",
        });
        return { token, userId: user.id, role: user.role };
      }
    }

    throw {
      code: 400,
      message: "Login failed",
    };
  };

  findUserById = async (id) => {
    return User.findById(id);
  };

  registerAsCustomer = async (payload) => {
    return this.create({ ...payload });
    // return this.create({ ...payload, role: "customer" });
  };

  validateToken = async (token) => {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);

      const user = await this.findUserById(payload.id);

      const result = { isValid: !!user };

      if (result.isValid) {
        result.userId = user.id;
        result.role = user.role;
      }

      return result;
    } catch (e) {
      return { isValid: false, message: "Invalid token" };
    }
  };
}

export default new UserService();
