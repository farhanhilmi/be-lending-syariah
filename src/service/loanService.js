import { validateLoanRequest } from '../utils/user.js';
import loanModel from '../models/loan.js';
import mongo from '../utils/mongodb.js';

const submitLoan = async (payload) => {
    try {
        const { error } = validateLoanRequest(payload);
        if (error) {
            throw new Error(error.details.map((err) => err.message));
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

export default { submitLoan };
