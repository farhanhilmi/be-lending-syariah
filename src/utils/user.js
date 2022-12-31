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
    const regexValidator =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){5,}$/m;
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        password: Joi.string().regex(regexValidator).required().messages({
            'string.base': `"a" should be a type of 'text'`,
            'string.empty': `Password cannot be an empty field`,
            'string.pattern.base':
                'Password must contain at least 5 characters including upper + lowercase + numbers and special character',
            'any.required': `Password is a required field`,
            'object.regex': 'Must have at least {#limit} characters',
        }),
    });
    const options = {
        abortEarly: false, // include all errors
    };
    return schema.validate(user, options);
};

const validateSendEmail = (data) => {
    const schema = Joi.object().keys({
        recipient: Joi.string().required(),
    });
    const options = {
        abortEarly: false, // include all errors
    };
    return schema.validate(data, options);
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

const generateRandomCode = () => {
    return Math.floor(Math.random() * 90000) + 10000;
};

export {
    validateUser,
    hashPassword,
    verifyPassword,
    generateAccessToken,
    generateRandomCode,
    validateSendEmail,
};
