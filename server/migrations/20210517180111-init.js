const faker =require ("faker");
const ObjectID = require('mongodb').ObjectID;

const RECORDS_COUNT = 30;
const FEEDS_COUNT = 5;

const RECORD_STATE = {
    IN_PROGRESS: 'IN_PROGRESS',
    NOT_STARTED: 'NOT_STARTED',
    NOT_AVAILABLE: 'NOT_AVAILABLE'
}

const SIMULATION_STATE = {
    IN_PROGRESS: 'IN_PROGRESS',
    PAUSED: 'PAUSED',
    NOT_STARTED: 'NOT_STARTED',
    NOT_AVAILABLE: 'NOT_AVAILABLE'
}

const RECORDS = Array.from({ length: RECORDS_COUNT })
    .map((_, i) => ({
        name: `${i + 1} ${faker.name.title()}`,
        recordState: RECORD_STATE.NOT_STARTED,
        recordSteps: faker.datatype.number({ min: 100, max: 200 }),
        simulationState: SIMULATION_STATE.NOT_STARTED,
        simulationStep: 0,
        created: new Date(),
        feedsMeta: Array.from({ length: FEEDS_COUNT })
            .map((_, i) => ({
                _id: new ObjectID(),
                feedUrl: `http://site.com/${i + 1}`,
                fileName: `feedName-${i + 1}`
            })),
        timestampLabels: [
            { step: 1, label: 'Start game' },
            { step: 10, label: 'Start of 1st period' },
            { step: 20, label: 'Goal 0:1' },
            { step: 50, label: 'Start of 2nd period' },
            { step: 70, label: 'Finished of 2nd period' }
        ],
        labels: []
    }));

module.exports = {
    async up(db, client) {
        await db.collection('records').insertMany(RECORDS);
        console.log('Record created');
    },

    async down(db, client) {
        await db.dropDatabase();
    }
};
