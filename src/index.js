import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { createStream } from 'rotating-file-stream';

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup logging
var accessLogStream = createStream('access.log', {
	interval: '1d', // rotate daily
	path: path.join(__dirname, '../logs'),
});
app.use(logger('combined', { stream: accessLogStream }));

app.get('/', (req, res) => res.send('Hello World!'));

// listen for requests
app.listen(process.env.PORT, () => {
	console.log(`Server is listening on port ${process.env.PORT}`);
});

export default app;
