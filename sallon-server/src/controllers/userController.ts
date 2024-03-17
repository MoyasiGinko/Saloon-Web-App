import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User} from '../models/User';


const register = async (req: Request, res: Response) => {
  try {
    console.log('****the body is*****', req.body)
    const { firstName, lastName, email, password, cPassword } : {firstName: string, lastName: string, email: string, password: string, cPassword: string} = req.body;

    if (!firstName || !lastName || !email || !password || !cPassword) {
      return res.status(400).json({error: 'All fields are required'})
    }
    if (password !== cPassword){
      return res.status(400).json({error: 'password do not match'})
    }
    const existingUser = await User.findOne({email})
    if(existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hasedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({firstName, lastName, email, password: hasedPassword})
    await newUser.save();
    console.log("the User is", newUser)
    res.status(201).json({message: "User has been registered successfully"})
  } catch (error) {
    console.error('Error while registering the user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { register }