import mongoConnection from '../../connections/mongo-connection.provider';
import {RecordModel, SIMULATION_STATE} from '../../models/record.model';

const INTERVAL = 1000;

mongoConnection.connect()
    .then(() => {
        runProcess();
    });

const runProcess = () => {
    simulateTick();
};

const simulateTick = async (): Promise<any> => {
    const newRecord = await RecordModel
        .findOneAndUpdate({
            _id: process.env.recordId,
            simulationState: SIMULATION_STATE.IN_PROGRESS,
            $expr: {$lt: ['$simulationStep', '$recordSteps']}
        }, {
            $inc: {simulationStep: 1}
        });
    if (!newRecord) {
        await RecordModel.findOneAndUpdate({
            _id: process.env.recordId
        }, {
            $set: {simulationState: SIMULATION_STATE.NOT_STARTED}
        })
        process.exit();
    }
    setTimeout(simulateTick, INTERVAL);
};

process.on('message', (msg: { type: string }) => {
    console.log(msg.type);
});
