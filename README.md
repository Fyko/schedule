# Twitter Schedule Bot 📅
[![Travis](https://api.travis-ci.org/carterh64/schedule.svg?branch=master)](https://travis-ci.org/carterh64/schedule)
[![Dependencies](https://img.shields.io/david/carterh64/schedule.svg?maxAge=3600)](https://david-dm.org/carterh64/schedule)
[![GitHub issues](https://img.shields.io/github/issues/carterh64/schedule)](https://github.com/sycer-dev/carterh64/schedule)
[![GitHub stars](https://img.shields.io/github/stars/carterh64/schedule)](https://github.com/sycer-dev/carterh64/schedule)  

This bot will autonomously post announcements and reminders 10 minutes before the next period starts on what period it is and when it starts.

## How it works
A cronjob will fire every day at 6:30 am, where it will send the initial tweet for the day. At the scheduled time for each reminder, a reply will be added to the initial tweet.

## Delays
The initial tweet providing the schedule images is fired at 06:30 when the cronjob is ran.
The bot will reply to the main tweet 10 minutes before the time of the next period / block.

### Silver (all)
| Period   | Starts At | Send reply                           |
|----------|-----------|--------------------------------------|
| initial  | -         | Sends at 6:30                        |
| 3        | 8:25      | Reply at 8:05 - 95 min after tweet  |
| 5        | 9:25      | Reply at 9:05 - 155 min after tweet  |
| 7        | 10:25     | Reply at 10:05 - 215 min after tweet |
| 2 i      | 11:25     | Reply at 11:05 - 275 min after tweet |
| 2 ii     | 12:05     | Reply at 11:45 - 315 min after tweet |
| 4        | 1:05      | Reply at 12:45 - 375 min after tweet |
| 6        | 2:05      | Reply at 1:45 - 435 min after tweet  |
| good bye | -         | Reply at 3:05 - 515 min after tweet  |

### White Day (even + ICE)
| Period   | Starts At | Send reply                           |
|----------|-----------|--------------------------------------|
| initial  | -         | Sends at 6:30                        |
| ice ii   | 8:00      | Reply at 7:50 - 80 min after tweet   |
| ice iii  | 8:30      | Reply at 8:20 - 110 min after tweet  |
| 2        | 9:10      | Reply at 9 - 190 min after tweet     |
| 4 i      | 11        | Reply at 10:50 - 300 min after tweet |
| 4 ii     | 11:35     | Reply at 11:25 - 335 min after tweet |
| 6        | 1:25      | Reply at 1:15 - 385 min after tweet  |
| good bye | -         | Reply at 3:15 - 505 min after tweet  |

### Blue (odd)
| Period   | Starts At | Send reply                           |
|----------|-----------|--------------------------------------|
| initial  | -         | Sends at 6:30                        |
| 3        | 9:10      | Reply at 9:00 - 150 min after tweet  |
| 5 i      | 11        | Reply at 10:50 - 300 min after tweet |
| 5 ii     | 11:35     | Reply at 11:25 - 335 min after tweet |
| 7        | 1:25      | Reply at 1:15 - 385 min after tweet  |
| good bye | -         | Reply at 3:15 - 505 min after tweet  |

## Contributing
Open to PRs and all issues will be addressed accordingly.