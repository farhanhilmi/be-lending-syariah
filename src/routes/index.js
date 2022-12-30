import express from 'express';

import authHandler from '../handler/auth.js';
const router = express.Router();

const Routes = () => {
    const router = express.Router();

    router.post('/authentication/register', authHandler.postNewUser);
    router.post('/authentication/login', authHandler.login);

    return router;
};
export default Routes;
