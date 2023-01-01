import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const loanSchema = new mongoose.Schema(
    {
        loan_amount: {
            type: Number,
            required: 'Loan Amount is required!',
        },
        borrowing_period: {
            type: String,
            required: 'Borrowing period is required!',
        },
        tujuan_pinjaman: {
            type: String,
            minlength: 5,
            required: 'Tujuan Pinjaman is required!',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    {
        timestamps: { createdAt: 'createdDate', updatedAt: 'modifyDate' },
        collection: 'loans',
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

loanSchema.virtual('user', {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

export default mongoose.model('loan', loanSchema);
