import express, {Request} from 'express';
import {PaginationRequest} from '../types';
import {PatternModel, Pattern} from '../models/pattern.model';
import {Record, RecordModel} from '../models/record.model';

export const patternRouter = express.Router();


patternRouter.get('/', async (req: PaginationRequest, res) => {
    const {offset, limit} = req.query;
    const [count, items] = await Promise.all([
        PatternModel.countDocuments(),
        PatternModel.find({}).skip(Number(offset)).limit(Number(limit))
    ]);
    res.send({
        items: items,
        count: count
    });
});


const INIT_PATTERN: Partial<Pattern> = {
    variables: [],
    feedMetaPatterns: []
}
patternRouter.post('/', async (req, res) => {
    const newItem: Pattern = {
        ...INIT_PATTERN,
        ...req.body,
        created: new Date()
    };
    const createdItem = await PatternModel.create(newItem);
    res.send(createdItem);
});

patternRouter.delete('/:patternId', async (req, res) => {
    const {patternId} = req.params;
    const deletedPattern = await PatternModel.findByIdAndDelete(patternId);
    if (!deletedPattern) {
        return res.status(404).json({message: `Record with id ${patternId} not found`});
    }
    res.json(deletedPattern);
});
