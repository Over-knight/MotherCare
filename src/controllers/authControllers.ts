import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, phone, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword});
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Error registering User"});
    }
};

export const login = async (req: Request, res: Response):Promise<any> => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({ email });
        if(!user) 
            return res.status(400).json({ message: "User not found"});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid Credentials"});

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {expiresIn: "1d"});
        const refreshToken = jwt.sign({userId: user._id}, JWT_REFRESH_SECRET, {expiresIn: '7d'});
        user.refreshToken = refreshToken
        await user.save();

        res.json({ accessToken, refreshToken});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login error"});
    }
};

// GET /api/auth/profile
// protected
export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try{
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }
        const user = await User.findById(userId).select("name email");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            _id: user._id,
            name: user.fullName,
            email: user.email,
            role: user.role
        })
    } catch (error: any) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error: error.message})
    }
};

export const refresh = async (req: Request, res: Response): Promise<any> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token missing' });

    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
    const user = await User.findById(payload.userId);
    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ error: 'Invalid refresh token' });

    const newAccessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Token refresh failed', details: err });
  }
};

//PUT /api/auth/profile
//protected
export const updateProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req.user as any).userId;
    const { fullName, phone } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Update failed', details: err });
  }
};


export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.refreshToken = '';
    await user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed', details: err });
  }
};