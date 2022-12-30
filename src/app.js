import express, { json, urlencoded } from 'express';

import Routes from './routes/index.js';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './utils/template.html'));
});

app.use('/api/', Routes());

// API ENDPOINT NOT FOUND
app.use((req, res, next) => {
    const error = new Error("API endpoint doesn't exist");
    error.status = 404;
    next(error);
});

// error handler middleware
app.use((error, req, res, _) => {
    res.status(error.status || 500).json({
        success: false,
        data: [],
        message: error.message || 'Internal Server Error',
    });
});

export default app;
