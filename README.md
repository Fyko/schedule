<div align='center'>
  <img width="200px" src='https://i.ibb.co/SV6sZhn/blurple-5.png'>
</div>

# Twitter Schedule Bot 📅
[![Actions Status](https://github.com/carterh64/schedule/workflows/Lint/badge.svg)](https://github.com/carterh64/schedule/actions)
[![Dependencies](https://img.shields.io/david/carterh64/schedule.svg?maxAge=3600)](https://david-dm.org/carterh64/schedule)
[![GitHub issues](https://img.shields.io/github/issues/carterh64/schedule)](https://github.com/sycer-dev/carterh64/schedule)
[![GitHub stars](https://img.shields.io/github/stars/carterh64/schedule)](https://github.com/sycer-dev/carterh64/schedule)  

This bot will autonomously post announcements and reminders 10 minutes before the next period starts on what period it is and when it starts.

## How it works
A cronjob will fire every day at 6:30 am, where it will send the initial tweet for the day. At the scheduled time for each reminder, a reply will be added to the initial tweet.

## Running
It's suggested to run the bot in a Docker container. However, since Docker doesn't have a log system like pm2 does, I'll be using pm2 to run it until I integrate Sentury to handle errors and what not for me.

## Handing Tweets
This packages uses the [`twit`](https://npmjs.com/twit) library. Yes, it's very oudated but I'm working on making my own Twitter library built on axios.

### Images
Twitter is weird when it comes to images. To add an image to your tweet, you must first encode your image into base 64 then upload it to their media endpoint.  
For this project, I'm using the [`node-superfetch`](https://npmjs.com/node-superfetch) package to request image links then encode them to base 64. Only after will I send it up to twitter's media endpoint. It will then return a media ID that you ~~can~~ should reuse for our purpouses. 

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