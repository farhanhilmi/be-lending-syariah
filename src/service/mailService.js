import fs from 'fs';
import nodemailer from 'nodemailer';
import mustache from 'mustache';
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

        const template = fs.readFileSync(
            './src/utils/mail/template.html',
            'utf8',
        );

        const mailOptions = {
            from: {
                name: 'P2P Lending Syariah',
                address: 'lendingsyariah@gmail.com',
            },
            to: data.recipient,
            subject: data.subject,
            html: mustache.render(template, { ...data }),
            // text: data.content,
        };

        transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

export default { sendMail };
