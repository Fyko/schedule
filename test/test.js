const { schedule } = require('node-cron');

schedule('* * * * *', () => {
    console.dir(`fired at ${new Date().toISOString}`);
}, {
    timezone: 'America/Denver',
});
