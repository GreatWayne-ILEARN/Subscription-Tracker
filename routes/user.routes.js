import {Router} from "express";
import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = new Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send({title: 'Create New user'}))

userRouter.put('/:id', (req, res) => res.send({title: 'Update user'}))

userRouter.delete('/:id', (req, res) => res.send({title: 'Delete user'}))

export default userRouter;