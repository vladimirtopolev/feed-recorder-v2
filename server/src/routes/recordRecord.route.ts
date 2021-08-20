import express, {Request} from 'express';
import {RECORD_STATE, RecordModel} from '../models/record.model';
import {recorder} from '../controllers/recorder/Recorder';
export const recordRecordRouter = express.Router();


recordRecordRouter.get('/:recordId/recordingRecord', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = await RecordModel.findById(recordId);
    if (!record) {
        return res.status(404).json({message: `Couldn't find record ${recordId}`});
    }
    res.json({
        recordState: record.recordState,
        recordSteps: record.recordSteps,
    });
});

recordRecordRouter.get('/:recordId/recordingRecord/start', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = await RecordModel.findByIdAndUpdate(recordId, {$set: {recordState: RECORD_STATE.IN_PROGRESS}}, {new: true});
    if (!record) {
        return res.status(404).json({message: `Couldn't find record ${recordId}`});
    }
    recorder.start(recordId);
    res.json({
        recordState: record.recordState,
        recordSteps: record.recordSteps,
    });
});


recordRecordRouter.get('/:recordId/recordingRecord/stop', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = await RecordModel.findByIdAndUpdate(recordId, {
            $set: {
                recordState: RECORD_STATE.NOT_STARTED
            }
        },
        {new: true}
    );
    if (!record) {
        return res.status(404).json({message: `Couldn't find record ${recordId}`});
    }
    recorder.stop(recordId);
    res.json({
        recordState: record.recordState,
        recordSteps: record.recordSteps,
    });
});
