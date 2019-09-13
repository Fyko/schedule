const { schedule } = require('node-cron');

schedule('28 19 * * *', () => {
    console.dir(`fired at ${new Date().toISOString}`);
}, {
    timezone: 'America/Denver',
});
