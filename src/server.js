import mongoose from 'mongoose';
import config from './config/index.js';

import app from './app.js';

try {
    await mongoose
        .connect(config.db.uri)
        .then(() => console.log('Connected to DB'));
    app.listen(config.app.port, () => {
        console.log(`Server running on port ${config.app.port}`);
    });
} catch (err) {
    console.log(err);
}
