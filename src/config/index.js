import dotenv from 'dotenv';

dotenv.config();

const {
    MONGODB_URI,
    PORT,
    SECRET_TOKEN,
    TOKEN_EXPIRES_IN,
    HOST,
    EMAIL_PASS,
    EMAIL_USER,
    OAUTH_REFRESH_TOKEN,
    OAUTH_CLIENT_SECRET,
    OAUTH_CLIENTID,
} = process.env;

const config = {
    app: {
        port: PORT,
        host: HOST,
    },
    db: {
        uri: MONGODB_URI,
    },
    mail: {
        user: EMAIL_USER,
        password: EMAIL_PASS,
        OAUTH_CLIENTID: OAUTH_CLIENTID,
        OAUTH_CLIENT_SECRET: OAUTH_CLIENT_SECRET,
        OAUTH_REFRESH_TOKEN: OAUTH_REFRESH_TOKEN,
    },
    SECRET_TOKEN,
    tokenExpiresIn: TOKEN_EXPIRES_IN,
};

export default config;
