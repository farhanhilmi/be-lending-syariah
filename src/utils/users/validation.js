import userModel from '../../models/user.js';

const isUserVerified = async (email) => {
    const user = await userModel.findOne({ email: email });
    return user.verified;
};

const isUserExist = async ({ key, value }) => {
    return await userModel.exists({ [key]: value });
};

export { isUserVerified, isUserExist };
