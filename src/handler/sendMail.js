import mailService from '../service/mailService.js';
import { generateRandomCode } from '../utils/user.js';

const sendMail = async (req, res, next) => {
    const payload = req.body;
    const randomNum = generateRandomCode();
    const data = {
        ...payload,
        subject: `Verify Your Email [P2P Lending Syariah]`,
        code: randomNum,
    };
    try {
        await mailService.sendMail(data);

        res.status(200).json({
            success: true,
            message: 'success send email',
            data: [{ otp_code: randomNum }],
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

export default { sendMail };
