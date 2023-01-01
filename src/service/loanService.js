import { validateLoanRequest } from '../utils/user.js';
import loanModel from '../models/loan.js';
import mongo from '../utils/mongodb.js';

const submitLoan = async (payload) => {
    try {
        const { error } = validateLoanRequest(payload);
        if (error) {
            throw new Error(error.details.map((err) => err.message));
        }
        const isExist = await loanModel.exists({ userId: payload.userId });
        if (isExist) {
            throw new Error(
                'You have already submitted a loan application. You must settle your current active debt bills!',
            );
        }

        const data = await loanModel.create({
            ...payload,
            userId: mongo.toObjectId(payload.userId),
        });
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

const fetchAll = async () => {
    try {
        const data = await loanModel.find().populate({
            model: 'users',
            path: 'user',
            select: '_id name email',
        });
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

export default { submitLoan, fetchAll };
