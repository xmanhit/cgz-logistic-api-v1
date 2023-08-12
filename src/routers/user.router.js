import express from 'express';
import userController from '../controllers/user.controller.js';
import authorization from '../middlewares/authorization.middleware.js';

const router = express.Router();

// Create a user;
// router.post('/', authorization.checkAdmin, userController.create);
router.post('/', userController.create);

// Get all users
router.get('/', authorization.checkAdmin, userController.findAll);

export default router;