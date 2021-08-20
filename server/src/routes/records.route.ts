import express, {Request} from 'express';
import {PaginationRequest} from '../types';
import {RecordModel, Record, RECORD_STATE, SIMULATION_STATE, FeedMeta} from '../models/record.model';

export const recordRouter = express.Router();

const INIT_RECORD: Partial<Record> = {
    recordState: RECORD_STATE.NOT_STARTED,
    simulationState: SIMULATION_STATE.NOT_STARTED,
    simulationStep: 0,
    recordSteps: 0,
    feedsMeta: [],
    labels: [],
    timestampLabels: []
};

recordRouter.get('/', async (req: PaginationRequest, res) => {
    const {offset, limit} = req.query;
    const [count, items] = await Promise.all([
        RecordModel.countDocuments(),
        RecordModel.find({}).skip(Number(offset)).limit(Number(limit)).sort({_id: -1})
    ]);
    res.send({
        items: items,
        count: count
    });
});


recordRouter.post('/', async (req, res) => {
    const newItem: Record = {
        ...INIT_RECORD,
        ...req.body,
        created: new Date()
    };
    const createdItem = await RecordModel.create(newItem);
    res.send(createdItem);
});

recordRouter.get('/:recordId', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = await RecordModel.findById(recordId);
    if (!record) {
        return res.status(404).json({message: `Couldn't find record ${recordId}`});
    }
    res.send(record);
});

recordRouter.put('/:recordId', async (req, res) => {
    const {recordId} = req.params;
    const modifier = ['name', 'simulationStep'].reduce((memo, field) => {
        return req.body[field] ? {...memo, [field]: req.body[field]} : memo;
    }, {});
    console.log(modifier);

    const newRecord = await RecordModel.findByIdAndUpdate(
        {_id: recordId},
        {$set: modifier}
    );
    if (!newRecord) {
        return res.status(404).json({message: `Record with id ${recordId} not found`});
    }
    res.send(newRecord);
});

recordRouter.delete('/:recordId', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const deletedRecord = await RecordModel.findByIdAndDelete(recordId);
    if (!deletedRecord) {
        return res.status(404).json({message: `Record with id ${recordId} not found`});
    }
    res.json(deletedRecord);
});


// FEEDS META ROUTES
recordRouter.get('/:recordId/feedsMeta', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = await RecordModel.findById(recordId);
    if (!record) {
        return res.sendStatus(404).json({message: `Record with id ${recordId} not found`});
    }
    res.send(record.feedsMeta);
});

recordRouter.post('/:recordId/feedsMeta', async (req: Request<{ recordId: string }, any, FeedMeta>, res) => {
    const {recordId} = req.params;
    const feedMeta = req.body;

    const newRecord = await RecordModel.findByIdAndUpdate(recordId, {$push: {feedsMeta: feedMeta}}, {new: true});
    if (!newRecord) {
        return res.status(404).json({message: `Record with id ${recordId} not found`});
    }
    res.send(newRecord.feedsMeta.splice(-1)[0]);
});

const getFeedMetaById = async (recordId: string, feedMetaId: string) => {
    const feedMetaDocument = await RecordModel.findOne(
        {_id: recordId, 'feedsMeta._id': feedMetaId},
        {'feedsMeta.$': 1}
    );
    return feedMetaDocument?.feedsMeta[0] || null;
};

recordRouter.put('/:recordId/feedsMeta/:feedMetaId', async (req: Request<{ recordId: string, feedMetaId: string }, any, FeedMeta>, res) => {
    const {recordId, feedMetaId} = req.params;

    const modifier = (['feedUrl', 'fileName'] as (keyof FeedMeta)[])
        .reduce((result, key) => ({...result, [`feedsMeta.$.${key}`]: req.body[key]}), {});
    const newRecord = await RecordModel.updateOne(
        {_id: recordId, 'feedsMeta._id': feedMetaId},
        {$set: modifier}
    );
    if (!newRecord) {
        return res.status(404).json({message: `Record with id ${recordId} not found`});
    }
    const feedMeta = await getFeedMetaById(recordId, feedMetaId);
    res.send(feedMeta);
});

recordRouter.delete('/:recordId/feedsMeta/:feedMetaId', async (req: Request<{ recordId: string, feedMetaId: string }>, res) => {
    const {recordId, feedMetaId} = req.params;
    const newRecord = await RecordModel.findByIdAndUpdate(recordId, {$pull: {feedsMeta: {_id: feedMetaId}}});

    if (!newRecord) {
        return res.status(404).json({message: `Record with id ${recordId} not found`});
    }

    res.send({_id: feedMetaId, id: feedMetaId});
});

// TIMESTAMP LABELS ROUTES
recordRouter.post('/:recordId/timestampLabels', async (req, res) => {
    const recordId = req.params.recordId;
    const newLabel = req.body;

    const targetRecord = await RecordModel.findByIdAndUpdate(recordId, {$push: {timestampLabels: newLabel}}, {new: true});
    if (!targetRecord) {
        return res.status(404).json({message: `Record with id ${recordId} not found`});
    }
    res.send(targetRecord.timestampLabels.splice(-1)[0]);
});

const getTimestampLabelByStep = async (recordId: string, step: number) => {
    const feedMetaDocument = await RecordModel.findOne(
        {_id: recordId, 'timestampLabels.step': step},
        {'timestampLabels.$': 1}
    );
    return feedMetaDocument?.timestampLabels[0] || null;
};

recordRouter.put('/:recordId/timestampLabels/:stepId', async (req, res) => {
    const {recordId, stepId} = req.params;
    const step = Number(stepId);
    const newRecord = await RecordModel.updateOne(
        {_id: recordId, 'timestampLabels.step': step},
        {$set: {'timestampLabels.$.label': req.body.label}}
    );
    console.log(newRecord);
    if (!newRecord) {
        return res.status(404).json({message: `Record with id ${recordId} not found`});
    }
    const timestampLabel = await getTimestampLabelByStep(recordId, step);
    res.send(timestampLabel);
});

recordRouter.delete('/:recordId/timestampLabels/:stepId', async (req, res) => {
    const {recordId, stepId} = req.params;
    const step = Number(stepId);
    const newRecord = await RecordModel.findByIdAndUpdate(recordId, {$pull: {timestampLabels: {step}}});
    if (!newRecord) {
        return res.status(404).json({message: `Record with id ${recordId} not found`});
    }

    res.send({step});
});
