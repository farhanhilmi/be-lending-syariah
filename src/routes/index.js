import express from 'express';

import authHandler from '../handler/auth.js';
import sendEmail from '../handler/sendMail.js';

const Routes = () => {
    const router = express.Router();

    router.post('/authentication/register', authHandler.postNewUser);
    router.post('/authentication/login', authHandler.login);
    router.post('/authentication/verify/email', authHandler.verifyEmail);
    router.post('/authentication/otp/email', sendEmail.sendMail);

    return router;
};
export default Routes;
