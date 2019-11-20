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
A cronjob will fire every day at 5:30 am, where it will send the initial tweet for the day. At the scheduled time for each reminder, a reply will be added to the initial tweet.

## Running
It's suggested to run the bot in a Docker container. However, since Docker doesn't have a log system like pm2 does, I'll be using pm2 to run it until I integrate Sentury to handle errors and what not for me.

## Handing Tweets
This packages uses the [`twit`](https://npmjs.com/twit) library. Yes, it's very oudated but I'm working on making my own Twitter library built on axios.

### Images
Twitter is weird when it comes to images. To add an image to your tweet, you must first encode your image into base 64 then upload it to their media endpoint.  
For this project, I'm using the [node-superfetch](https://npmjs.com/node-superfetch) package to request image links then encode them to base 64. Only after will I send it up to twitter's media endpoint. It will then return a media ID that you ~~can~~ should reuse for our purpouses. 

## Delays
The initial tweet providing the schedule images is fired at 06:30 when the cronjob is ran.
The bot will reply to the main tweet 10 minutes before the time of the next period / block.

## Contributing
Open to PRs and all issues will be addressed accordingly.