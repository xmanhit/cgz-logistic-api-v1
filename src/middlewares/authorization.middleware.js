import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

class Authorization {
  checkAuth = async (req, res, next, role) => {
    const auth = req.header("Authorization");

    if (!auth) {
      res.status(401).send({
        code: 401,
        message: "Unauthorized",
      });
    }

    try {
      const token = auth?.replace("Bearer ", "");
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      const user = await userService.findUserById(payload.id);
      if (!user) {
        res.status(401).send({ code: 401, message: "Invalid token" });
        return;
      }
      switch (role) {
        case "admin":
          if (user.role === role) {
            next();
          } else {
            res.status(403).send({ code: 403, message: "Permission denied" });
          }
          break;
        case "customer":
        case "shipper":
          if (user.role === role || user.role === "admin") {
            next();
          } else {
            res.status(403).send({ code: 403, message: "Permission denied" });
          }
          break;
      }
    } catch (err) {
      res.status(401).send({ code: 401, message: "Invalid Token" });
    }
  };

  checkAdmin = async (req, res, next) => {
    this.checkAuth(req, res, next, "admin");
  };

  checkCustomer = async (req, res, next) => {
    this.checkAuth(req, res, next, "customer");
  };

  checkShipper = async (req, res, next) => {
    this.checkAuth(req, res, next, "shipper");
  };
}

export default new Authorization();
