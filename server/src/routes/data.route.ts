import express, {Request} from 'express';

export const dataRouter = express.Router();

dataRouter.get('/*', async (req, res) => {
    console.log('sds')
    res.json(req.params)
})