import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI, PORT, SECRET_TOKEN, TOKEN_EXPIRES_IN, HOST } = process.env;

const config = {
    app: {
        port: PORT,
        host: HOST,
    },
    db: {
        uri: MONGODB_URI,
    },
    SECRET_TOKEN,
    tokenExpiresIn: TOKEN_EXPIRES_IN,
};

export default config;
