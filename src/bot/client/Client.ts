import { Collection } from 'discord.js';
import RESTHandler from '../rest/RESTHandler';
import { schedule, ScheduledTask } from 'node-cron';
import { createLogger, format, Logger, transports } from 'winston';
import { LoggerConfig } from '../util/LoggerConfig';
import { SCHEDULES } from '../util/Constants';
import SettingsProvider from '../database/provider/SettingsProvider';

export default class Client {
	public twitter: RESTHandler;

	public settings: SettingsProvider;

	public task!: ScheduledTask;

	public waiting: Collection<string, any>;

	public constructor() {
		this.twitter = new RESTHandler(this);
		this.settings = new SettingsProvider(this);
		this.waiting = new Collection();
	}

	public logger: Logger = createLogger({
		levels: LoggerConfig.levels,
		format: format.combine(
			format.colorize({ level: true }),
			format.errors({ stack: true }),
			format.splat(),
			format.timestamp({ format: 'MM/DD/YYYY HH:mm:ss' }),
			format.printf((data: any) => {
				const { timestamp, level, message, ...rest } = data;
				return `[${timestamp}] ${level}: ${message}${Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''}`;
			}),
		),
		transports: new transports.Console(),
		level: 'custom',
	});;


	private async handleDay(): Promise<void> {
		const now = new Date();
		const day = now.getDay();

		// if it is sunday or saturday
		if ([0, 6].includes(day)) return;
		const schedule = SCHEDULES[day];
		try {
			const images = [schedule[25].text];
			if (schedule[26]) images.push(schedule[26].text);
			const tweet = await this.twitter.tweet(schedule[0].text, images);
			if (tweet) {
				await this.settings.new('tweet', {
					tweetID: tweet.id_str,
					schedule,
				});
				for (const [i, options] of Object.entries(schedule)) {
					if (['0', '25', '26'].includes(`${i}`)) continue;
					this.waiting.set(i, setTimeout(() => {
						this.twitter.reply(options.text, tweet.id_str);
					}, (options.triggerAfter * 60 * 1000)));
				}
			} else { this.logger.error(`[ERROR ON TWEET]: Tweet returned null.`); }
		} catch (err) {
			this.logger.error(`[ERROR ON HANDLE]: ${err}`);
		}
		console.dir(this.waiting);
	}

	private _createTask(): void {
		this.task = schedule('30 5 * * *', () => {
			return console.log('okay');
			this.handleDay();
		}, {
			timezone: 'America/Denver',
		});
	}

	public async init(): Promise<void> {
		await this.settings.init();
		this._createTask();
		this.logger.debug('[STARTUP] Successfully launched Client.');
	}
}
