import express from 'express';

import authHandler from '../handler/auth.js';
import sendEmail from '../handler/sendMail.js';

const Routes = () => {
    const router = express.Router();

    router.post('/authentication/register', authHandler.postNewUser);
    router.post('/authentication/login', authHandler.login);
    router.post('/authentication/otp/email', sendEmail.verifyEmail);

    return router;
};
export default Routes;
