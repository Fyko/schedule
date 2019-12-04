import Collection from '@discordjs/collection';
import { schedule, ScheduledTask } from 'node-cron';
import { createLogger, format, Logger, transports } from 'winston';
import SettingsProvider from '../../database/provider/SettingsProvider';
import { SCHEDULES } from '../util/Constants';
import { LoggerConfig } from '../util/LoggerConfig';
import RESTHandler from './RESTHandler';

export default class Client {
	public twitter: RESTHandler;

	public settings: SettingsProvider;

	public task!: ScheduledTask;

	public waiting: Collection<string, NodeJS.Timeout>;

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
				return `[${timestamp}] ${level}: ${message}${
					Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''
				}`;
			}),
		),
		transports: new transports.Console(),
		level: 'custom',
	});

	private async handleDay(): Promise<void> {
		const now = new Date();
		const day = now.getDay();

		if ([0, 6].includes(day)) return;
		const schedule = SCHEDULES[day]!;
		this.logger.info(`[NEW DAY]: STARTING NEW DAY! ${now.toLocaleString()}`);
		try {
			const images = [schedule[25].text];
			if (schedule[26]) images.push(schedule[26].text);
			const tweet = await this.twitter.tweet(schedule[0].text, images);
			if (tweet) {
				for (const [i, { text, triggerAt }] of Object.entries(schedule)) {
					if (['0', '25', '26'].includes(i)) continue;

					const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Denver' }));
					now.setHours(triggerAt.hr);
					now.setMinutes(triggerAt.min);

					this.settings.new('tweet', {
						replyToID: tweet.id_str,
						text,
						triggerAt: now,
					});
				}
			} else {
				this.logger.error(`[ERROR ON TWEET]: Tweet returned null.`);
			}
		} catch (err) {
			this.logger.error(`[ERROR ON HANDLE]: ${err}`);
		}
	}

	private _createTask(): void {
		this.task = schedule(
			'30 5 * * *',
			() => {
				this.handleDay();
			},
			{
				timezone: 'America/Denver',
			},
		);
	}

	public async init(): Promise<void> {
		await this.settings.init();
		this._createTask();
		this.logger.debug('[STARTUP] Successfully launched Client.');
	}
}
