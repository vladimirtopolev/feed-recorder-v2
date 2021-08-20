import {Schema, Document, model} from 'mongoose';

export type PatterVariable = {
    key: string,
};

export type FeedMetaPattern = {
    feedUrl: string,
    fileName: string
};

export type Pattern = {
    name: string,
    description: string,
    variables: PatterVariable[],
    feedMetaPatterns: FeedMetaPattern[],
    created: Date,
}

const VariableSchema = new Schema({
    key: {type: String, required: true}
});

const FeedMetaPatternSchema = new Schema({
    feedUrl: {type: String, required: true},
    fileName: {type: String, required: true},
});

const PatternSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true, default: ''},
    variables: {type: [VariableSchema], default: []},
    feedMetaPatterns: {type: [FeedMetaPatternSchema], default: []},
    created: {type: Date, default: Date.now}
});

export type PatternDocument = Pattern & Document;

export const PatternModel = model<PatternDocument>('Pattern', PatternSchema);
