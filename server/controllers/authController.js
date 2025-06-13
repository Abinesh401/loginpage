const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const createError = require('../utils/appError');
const jwt = require('jsonwebtoken');



// Register user
exports.signup = async (req, res, next) => {
    try {
        // Normalize email (convert to lowercase)
        const email = req.body.email.toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log('Existing user found:', existingUser);
            return next(new createError('User already exists', 400));
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            email, // use normalized email
            password: hashedPassword,
        });

        const token = jwt.sign({ _id: newUser._id }, 'secretkey12334', {
            expiresIn: '80d',
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                
            },
        });

    } catch (error) {
        next(error);
    }
};




// login user

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // If no user is found, return an error
        if (!user) {
            return next(new createError('User not found', 404));
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new createError('Invalid email or password', 401));
        }

        // Generate a token using the user ID
        const token = jwt.sign({ _id: user._id }, 'secretkey12334', {
            expiresIn: '80d',
        });

        // Send the response with the user details and token
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        next(error);
    }
};

