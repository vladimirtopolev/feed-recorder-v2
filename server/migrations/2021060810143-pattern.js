const faker =require ("faker");

const PATTERN_COUNT = 5;

const PATTERNS = Array.from({ length: PATTERN_COUNT })
    .map((_, i) => ({
        name: `${i + 1} ${faker.name.title()}`,
        description: `ECHL client ${i}; 3d party provider HockeySport, set name 1`,
        variables: [
            {
                key: 'seasonId'
            },
            {
                key: 'matchId'
            },
            {
                key: 'teamHomeId'
            },
            {
                key: 'teamAwayId'
            },
            {
                key: 'gameInfo'
            },
            ...(() => i % 2 === 0 ? [{ key: 'testField' }] : [])()
        ],
        feedMetaPatterns: [
            {
                id: '1',
                fileName: 'schedule-${seasonId}',
                feedUrl: 'http://sport.com/${seasonId}'
            },
            {
                id: '2',
                fileName: 'game-info-${matchId}',
                feedUrl: 'http://sport.com/game-info/${matchId}'
            },
            {
                id: '3',
                fileName: 'team-stats-${teamHomeId}',
                feedUrl: 'http://sport.com/team-stats/${gameInfo}/${teamHomeId}'
            },
            {
                id: '3',
                fileName: 'team-stats-${teamAwayId}',
                feedUrl: 'http://sport.com/team-stats/${gameInfo}/${teamAwayId}'
            }
        ]
    }));

module.exports = {
    async up(db, client) {
        await db.collection('patterns').insertMany(PATTERNS);
        console.log('Pattern created');
    },

    async down(db, client) {
        await db.collection('patterns').drop();
    }
};
