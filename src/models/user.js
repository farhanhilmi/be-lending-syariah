import mongoose from 'mongoose';

const genderOptions = {
    values: ['male', 'female'],
};

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: 'Name is required!',
            minlength: 3,
        },
        email: {
            type: String,
            required: 'Email is required!',
            unique: true,
        },
        password: {
            type: String,
            minlength: 5,
            required: 'Password is required!',
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: 'createdDate: ', updatedAt: 'modifyDate: ' },
        collection: 'users',
    },
);

export default mongoose.model('Users', userSchema);
