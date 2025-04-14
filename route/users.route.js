import express from 'express';
import { usersController, usersLoginController } from '../controller/users.controller.js';

const usersRouter = express.Router();
usersRouter.post('/register', usersController)
usersRouter.post('/login', usersLoginController)
export default usersRouter;