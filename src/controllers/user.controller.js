import userService from "../services/user.service.js";
import { handleException } from "../utils/common.js";

class UserController {
  findAll = async (req, res) => {
    try {
      const result = await userService.findAll(req.body);
      res.status(200).json(result);
    } catch (e) {
      handleException(e, res);
    }
  };

  create = async (req, res) => {
    try {
      const result = await userService.create(req.body);
      res.status(201).json(result);
    } catch (e) {
      handleException(e, res);
    }
  };

  login = async (req, res) => {
    try {
      const result = await userService.login(req.body);
      res.status(200).json(result);
    } catch (e) {
      handleException(e, res);
    }
  };

  register = async (req, res) => {
    try {
      const result = await userService.registerAsCustomer(req.body);
      res.status(200).json(result);
    } catch (e) {
      handleException(e, res);
    }
  };

  validateToken = async (req, res) => {
    try {
      const auth = req.header("Authorization");

      if (!auth) {
        res.status(401).send({
          code: 401,
          message: "No token found",
        });
      }

      const token = auth?.replace("Bearer ", "");

      const { isValid, userId, role, message } =
        await userService.validateToken(token);

      return isValid
        ? res.status(200).json({ isValid, userId, role })
        : res.status(200).json({ isValid, message });
    } catch (e) {
      handleException(e, res);
    }
  };
}

export default new UserController();
