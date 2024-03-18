import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User} from '../models/User';
import { generateAccessToken, generateRefreshhToken } from '../Utils/jwtUtils';


const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, cPassword }: { firstName: string, lastName: string, email: string, password: string, cPassword: string } = req.body;

    if (!firstName || !lastName || !email || !password || !cPassword) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    if (password !== cPassword) {
      return res.status(400).json({ error: 'password do not match' })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hasedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ firstName, lastName, email, password: hasedPassword })
    await newUser.save();
    res.status(201).json({ message: "User has been registered successfully" })
  } catch (error) {
    console.error('Error while registering the user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const login = async (req: Request, res: Response) => { 
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user) {
      return res.status(401).json({error: "Invalid Credintails"})
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({message: "Invalid Credintails"});
    }
    const accessToken = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshhToken({userId: user.id, email: user.email});
    res.status(200).json({message: "Login successful", accessToken: accessToken, refreshToken: refreshToken});

  } catch (error) { 
    console.error('Error logging in', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const profile = (req: Request, res: Response) => {
  res.send("This is profile")
}

export { register, login, profile}