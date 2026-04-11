import User from "../modals/user.js";
// Shared cookie options
const cookieOptions = {
    httpOnly: true, // Prevents XSS
    secure: process.env.NODE_ENV === "production", // Only HTTPS in production
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        const token = await user.generateToken();

        res.status(201)
            .cookie("token", token, cookieOptions) // Set the cookie
            .json({
                success: true,
                user: { id: user._id, name: user.name, email: user.email }
            });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "User already exists" });
        }
        res.status(500).json({ message: error.message });
    }
};

export const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        const isPasswordValid = user ? await user.comparePassword(password) : false;

        if (!user || !isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await user.generateToken();

        res.status(200)
            .cookie("token", token, cookieOptions) // Set the cookie
            .json({ 
                success: true,
                user: { id: user._id, email: user.email, name: user.name }
            }); 
    } catch (error) {
        res.status(500).json({ message: "An internal server error occurred" });
    }
};

export const signOutUser = async (req, res) => {
    // To sign out, we just clear the cookie
    res.status(200)
        .cookie("token", "", { ...cookieOptions, expires: new Date(0) })
        .json({ message: "Signed out successfully" });
};


export const getCurrentUser = async (req, res) => {
    try {
        // req.user was populated by the middleware above
        const user = req.user;

        if (!user) {
            return res.status(404).json({ message: "User no longer exists" });
        }

        res.status(200).json({
            success: true,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        // 1. Get ID from the authenticated user object  -- from isUserAuthenticated middleware
        const userId = req.user.id; 
        const { name, email, password } = req.body;

        // 2. Find  user 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 3. Update fields manually
        if (name) user.name = name;
        if (email) user.email = email;
        
        // 4. If password is provided, updating it this way 
        // will trigger .pre('save') hashing hook! in usermodel
        if (password) {
            user.password = password;
        }

        await user.save();

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};