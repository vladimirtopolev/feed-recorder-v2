import express, {Request} from 'express';
import {RecordModel, SIMULATION_STATE} from '../models/record.model';
import {simulator} from '../controllers/simulator/Simulator';
export const recordSimulatorRouter = express.Router();


recordSimulatorRouter.get('/:recordId/simulationState', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = await RecordModel.findById(recordId);
    if (!record) {
        return res.status(404).json({message: `Couldn't find record ${recordId}`});
    }
    res.json({
        simulationState: record.simulationState,
        simulationStep: record.simulationStep
    });
});

recordSimulatorRouter.get('/:recordId/play', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = await RecordModel.findByIdAndUpdate(recordId, {$set: {simulationState: SIMULATION_STATE.IN_PROGRESS}}, {new: true});
    if (!record) {
        return res.status(404).json({message: `Couldn't find record ${recordId}`});
    }
    simulator.start(recordId);
    res.json({
        simulationState: record.simulationState,
        simulationStep: record.simulationStep
    });
});

recordSimulatorRouter.get('/:recordId/pause', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = await RecordModel.findByIdAndUpdate(recordId, {$set: {simulationState: SIMULATION_STATE.PAUSED}}, {new: true});
    if (!record) {
        return res.status(404).json({message: `Couldn't find record ${recordId}`});
    }
    simulator.pause(recordId);
    res.json({
        simulationState: record.simulationState,
        simulationStep: record.simulationStep
    });
});


recordSimulatorRouter.get('/:recordId/stop', async (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = await RecordModel.findByIdAndUpdate(recordId, {
            $set: {
                simulationState: SIMULATION_STATE.NOT_STARTED,
                simulationStep: 0
            }
        },
        {new: true}
    );
    if (!record) {
        return res.status(404).json({message: `Couldn't find record ${recordId}`});
    }
    simulator.stop(recordId);
    res.json({
        simulationState: record.simulationState,
        simulationStep: record.simulationStep
    });
});
