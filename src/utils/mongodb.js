import mongoose from 'mongoose';

export default {
    toObjectId: (id) => mongoose.Types.ObjectId(id),
};
