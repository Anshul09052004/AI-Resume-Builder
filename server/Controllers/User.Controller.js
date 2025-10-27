import User from "../Models/User.Model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../Models/Resume.Model.js"

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    return token
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please enter all the fields" })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashedPassword })

        const token = generateToken(newUser._id)
        newUser.password = undefined

        return res.status(200).json({
            message: "User registered successfully",
            user: newUser,
            token
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Please enter all the fields" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "User does not exist" })
        }
        if (!(await user.comparePassword(password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = generateToken(user._id)
        user.password = undefined

        return res.status(200).json({
            message: "User logged in successfully",
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const getUserResume = async (req, res) => {
    try {
        const userId = req.userId;
        const resumes = await Resume.find({ userId });
        return res.status(200).json({ resumes });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export { registerUser, loginUser, getUserResume }
