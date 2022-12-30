import userService from '../service/userService.js';

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

        const accessToken = await userService.login({ email, password });

        res.status(200).json({
            success: true,
            message: 'success',
            accessToken,
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
};
