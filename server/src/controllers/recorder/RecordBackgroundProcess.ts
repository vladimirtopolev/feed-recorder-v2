import mongoConnection from '../../connections/mongo-connection.provider';
import {FeedMeta, RECORD_STATE, RecordModel} from '../../models/record.model';
import {recordFileSystemConnector} from '../../service/RecordFileSystemConnector';
import {recordS3Connector} from '../../service/RecordS3Connector';
const INTERVAL = 10_000;

mongoConnection.connect()
    .then(() => {
        runProcess();
    });

const runProcess = () => {
    simulateTick();
};

const simulateTick = async () => {
    const newRecord = await RecordModel
        .findOneAndUpdate({
            _id: process.env.recordId,
            recordState: RECORD_STATE.IN_PROGRESS,
        }, {
            $inc: {recordSteps: 1}
        });
    if (!newRecord) {
        process.exit();
    }
    const feedsMeta: FeedMeta[] = newRecord.feedsMeta;

    const requests = feedsMeta.map(feedMeta => {
        return recordS3Connector.recordUrl(newRecord._id, feedMeta, newRecord.recordSteps)
    });
    await Promise.allSettled(requests);

    setTimeout(simulateTick, INTERVAL);
};