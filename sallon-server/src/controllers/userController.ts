import { Request, Response } from 'express';
import userService from '../services/userService';

const getAllUsersController = (req: Request, res: Response) => {
  const users = userService.getAllUsers();
  res.json(users);
};

export default {
  getAllUsersController
};