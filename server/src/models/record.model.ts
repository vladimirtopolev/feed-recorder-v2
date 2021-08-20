import {Schema, Document, model} from 'mongoose';


export enum RECORD_STATE {
    IN_PROGRESS = 'IN_PROGRESS',
    NOT_STARTED = 'NOT_STARTED',
    NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export enum SIMULATION_STATE {
    IN_PROGRESS = 'IN_PROGRESS',
    PAUSED = 'PAUSED',
    NOT_STARTED = 'NOT_STARTED',
    NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export type FeedMeta = {
    id: string,
    feedUrl: string,
    fileName: string
}

export type TimestampLabel = {
    step: number,
    label: string
}

export type Record = {
    id: string,
    name: string,
    recordState: RECORD_STATE,
    recordSteps: number,
    simulationState: SIMULATION_STATE,
    simulationStep: number,
    feedsMeta: FeedMeta[],
    timestampLabels: TimestampLabel[],
    labels: string[],
    created: Date,
}

const FeedMetaSchema = new Schema({
    feedUrl: {type: String, required: true},
    fileName: {type: String, required: true}
});

const TimestampLabelSchema = new Schema({
    step: {type: Number, required: true},
    label: {type: String, required: true}
});

const RecordSchema = new Schema({
    name: {type: String, required: true},
    recordState: {type: String, enum: Object.values(RECORD_STATE), default: RECORD_STATE.NOT_STARTED, required: true},
    recordSteps: {type: Number, default: 0},
    simulationState: {type: String, enum: Object.values(SIMULATION_STATE), default: SIMULATION_STATE.NOT_STARTED, required: true},
    simulationStep: {type: Number, default: 0},
    feedsMeta: {type: [FeedMetaSchema], default: []},
    timestampLabels: {type: [TimestampLabelSchema], default: []},
    labels: {type: [String], default: []},
    created: { type: Date, default: Date.now }
});

export type RecordDocument = Record & Document;
export type FeedMetaDocument = FeedMeta & Document;

export const RecordModel = model<RecordDocument>('Record', RecordSchema);
