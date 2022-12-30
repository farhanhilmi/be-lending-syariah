import nodemailer from 'nodemailer';
import config from '../config/index.js';

const sendMail = async (data) => {
    try {
        // const { error } = validateSendEmail(data);
        if (!data.recipient) {
            throw new Error('recipient email is required!');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mail.user,
                pass: config.mail.password,
                clientId: config.mail.OAUTH_CLIENTID,
                clientSecret: config.mail.OAUTH_CLIENT_SECRET,
                refreshToken: config.mail.OAUTH_REFRESH_TOKEN,
            },
        });
        const mailOptions = {
            from: config.mail.user,
            to: data.recipient,
            subject: data.subject,
            text: data.content,
        };

        transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        console.log(err);
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
