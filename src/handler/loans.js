import loanService from '../service/loanService.js';

const postNewLoan = async (req, res, next) => {
    const payload = req.body;

    try {
        const data = await loanService.submitLoan(payload);

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

export default { postNewLoan };
