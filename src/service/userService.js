import {
    generateAccessToken,
    hashPassword,
    validateUser,
    verifyPassword,
} from '../utils/user.js';
import userModel from '../models/user.js';

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

        const token = generateAccessToken(user._id.toString());
        return token;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

export default {
    createUser,
    login,
};
