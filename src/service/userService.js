import {
    generateAccessToken,
    hashPassword,
    validateUser,
    verifyPassword,
} from '../utils/user.js';
import userModel from '../models/user.js';

import { isUserExist, isUserVerified } from '../utils/users/validation.js';

const createUser = async (user) => {
    try {
        const { error } = validateUser(user);
        if (error) {
            throw new Error(error.details.map((err) => err.message));
        }

        const hashedPassword = await hashPassword(user.password);

        const userData = {
            ...user,
            password: hashedPassword,
            verified: false,
        };

        const isExist = await userModel.exists({
            email: user.email,
        });
        if (isExist) throw new Error('Username already exist');
        const newUser = await userModel.create(userData);

        return newUser;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

const login = async ({ email, password }) => {
    try {
        if (!(email && password)) throw new Error('All input is required!');

        const isExist = await userModel.exists({ email: email });
        if (!isExist) throw new Error('User Not Found!');
        const user = await userModel.findOne({ email: email });

        if (!user) {
            throw new Error(`email ${email} is not registered yet!`);
        }
        if (!(await verifyPassword(password, user.password))) {
            throw new Error('Password incorrect!');
        }

        if (!user?.verified) {
            return false;
        }

        const token = generateAccessToken(user._id.toString());
        return token;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

const verifyEmail = async ({ email }) => {
    try {
        if (!email) throw new Error('Email input is required!');

        if (!(await isUserExist({ key: 'email', value: email }))) {
            throw new Error('Email Not Found!');
        }

        if (await isUserVerified(email)) {
            throw new Error('This email has already been verified');
        }

        const user = await userModel.findOne({ email: email });
        const newData = { ...user._doc, verified: true };

        const newUser = await userModel.findByIdAndUpdate(user._id, newData, {
            new: true,
        });

        return newUser;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

export default {
    createUser,
    login,
    verifyEmail,
};
