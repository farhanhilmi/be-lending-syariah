import userService from '../service/userService.js';
import { generateRandomCode } from '../utils/user.js';
import mailService from '../service/mailService.js';

const postNewUser = async (req, res, next) => {
    const user = req.body;
    try {
        const newUser = await userService.createUser(user);

        res.status(201).json({
            success: true,
            message: 'success',
            data: newUser,
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                success: false,
                message: err.message,
                data: [],
            });
        } else {
            next(err);
        }
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await userService.login({ email, password });
        if (!result) {
            res.status(400).json({
                success: false,
                message: 'belum verif',
                deta: [],
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'success',
                accessToken: result,
            });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                success: false,
                message: err.message,
                data: [],
            });
        } else {
            next(err);
        }
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        // ! TODO Validation
        // Check if user belum regis
        // check if email user sudah terverifikasi

        const result = await userService.verifyEmail({ email });

        res.status(200).json({
            success: true,
            message: 'success verified user account',
            data: result,
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                success: false,
                message: err.message,
                data: [],
            });
        } else {
            next(err);
        }
    }
};

export default {
    login,
    postNewUser,
    verifyEmail,
};
