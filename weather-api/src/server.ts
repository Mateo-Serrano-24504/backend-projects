import express from 'express';

import { PORT } from './config/env';
import { weatherRouter } from './router/weatherRouter'

const app = express();

app.use(express.json());

app.use('/weather', weatherRouter);

app.listen(PORT, () => {
    console.log(`Connected successfully on port ${PORT}`)
});