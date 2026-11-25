import express from 'express';
import { getUsersController, usersController, usersLoginController } from '../controller/users.controller.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const usersRouter = express.Router();
usersRouter.post('/register', usersController)
usersRouter.post('/login', usersLoginController)
usersRouter.get('/user/:email', getUsersController)
export default usersRouter;