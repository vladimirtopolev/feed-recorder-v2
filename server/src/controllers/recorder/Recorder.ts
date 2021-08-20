import {ChildProcess, fork} from 'child_process';
import {join, resolve} from 'path';
import {RecordModel, SIMULATION_STATE} from '../../models/record.model';

class Recorder {
    private childProcessPool: { [key: string]: ChildProcess } = {};

    constructor() {
        RecordModel.find({simulationState: SIMULATION_STATE.IN_PROGRESS}, (err, res) => {
            if (!err) {
                res.forEach((record) => {
                    console.log(`Init recording for record ${record._id}`);
                    this.spawnRecordBackgroundProcess(record._id);
                });
            }
        });
    }

    private spawnRecordBackgroundProcess(recordId: string) {
        const childProcessCodeFile = process.env.NODE_ENV !== 'production'
            ? join(__dirname, 'RecordBackgroundProcess.ts')
            : join(__dirname, 'RecordBackgroundProcess.js');
        this.childProcessPool[recordId] = fork(childProcessCodeFile, ['-r', 'ts-node/register'], {
            env: {...process.env, recordId}
        });
    }

    start(recordId: string) {
        if (this.childProcessPool[recordId]) {
            this.childProcessPool[recordId].kill('SIGINT');
        }
        this.spawnRecordBackgroundProcess(recordId);
    }

    pause(recordId: string) {
        if (this.childProcessPool[recordId]) {
            this.childProcessPool[recordId].kill('SIGINT');
        }
    }

    stop(recordId: string) {
        if (this.childProcessPool[recordId]) {
            this.childProcessPool[recordId].kill('SIGINT');
        }
    }

}

export const recorder = new Recorder();