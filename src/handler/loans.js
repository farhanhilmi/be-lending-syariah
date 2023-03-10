import loanService from '../service/loanService.js';

const postNewLoan = async (req, res, next) => {
    const payload = req.body;

    try {
        console.log('req', req.user);
        const data = await loanService.submitLoan({
            ...payload,
            userId: req.user.userId,
        });

        res.status(200).json({
            success: true,
            message: 'success create new loan',
            data,
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

const getAllLoans = async (req, res, next) => {
    try {
        const data = await loanService.fetchAll();

        res.status(200).json({
            success: true,
            message: 'success fetching all loans data',
            data,
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

export default { postNewLoan, getAllLoans };
