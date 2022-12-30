import Joi from 'joi';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

/**
 *
 * @param {Object} user user data
 * @returns
 */
const validateUser = (user) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        password: Joi.string().min(5).required(),
    });
    const options = {
        abortEarly: false, // include all errors
    };
    return schema.validate(user, options);
};

/**
 *
 * @param {String} password user password plain text
 * @returns {Promise} hash password
 */
const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('base64');

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(`${salt}:${derivedKey.toString('base64')}`);
        });
    });
};

/**
 *
 * @param {String} password user password plain text
 * @param {String} hash hash password
 * @returns {Promise} true | false
 */
const verifyPassword = async (password, hash) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(':');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key === derivedKey.toString('base64'));
        });
    });
};

/**
 *
 * @param {String} userId userId for jwt payload
 * @returns {String} jwt token
 */
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, config.SECRET_TOKEN, {
        expiresIn: config.tokenExpiresIn,
    });
};

export { validateUser, hashPassword, verifyPassword, generateAccessToken };
