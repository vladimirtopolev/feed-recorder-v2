import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoConnection from './connections/mongo-connection.provider';
import s3Connection from './connections/s3-connection.provider';
import httpStatus from 'http-status';
import { errorConverter, errorHandler } from './middlewares/error';

import {patternRouter} from './routes/pattern.route';
import {recordRouter} from './routes/records.route';
import {recordSimulatorRouter} from './routes/recordSimulator.route';
import {recordRecordRouter} from './routes/recordRecord.route';
import {dataRouter} from './routes/data.route';
import {projectRouter} from './routes/project.route';
import ApiError from './utils/appError';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// API ROUTES

app.use('/api/projects', projectRouter);
app.use('/api/*', (req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
})
/*
app.use('/api/data', dataRouter);
app.use('/api/patterns', patternRouter);
app.use('/api/records', recordRecordRouter);
app.use('/api/records', recordSimulatorRouter);
app.use('/api/records', recordRouter);
 */


app.use('/static', express.static(path.resolve(__dirname, '../static/static')));

app.get('*', (req, res) => {
    const pathFile = path.resolve(__dirname, '../static/index.html');
    res.sendFile(pathFile);
});

app.use(errorConverter);
app.use(errorHandler);


Promise.all(
    [
        mongoConnection.connect(),
        s3Connection.connect()
    ]
)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is listening on ${PORT}`);
        });
    });
