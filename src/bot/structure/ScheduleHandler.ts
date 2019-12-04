import { Tweet } from '../../database/models/Tweet';
import Client from './Client';

export default class ScheduleHandler {
	protected client: Client;

	protected interval!: NodeJS.Timeout;

	protected rate: number;

	protected waiting: Set<string>;

	public constructor(client: Client, { rate = 60000 } = {}) {
		this.client = client;
		this.rate = rate;
		this.waiting = new Set();
	}

	public async init(): Promise<void> {
		this._check();
		this.interval = setInterval(this._check.bind(this), this.rate);
		this.client.logger.info('[SCHEDULE HANDLER] Successfully launched schedule handler.');
	}

	private fire(schedule: Tweet): void {
		if (this.client.settings.tweet.get(`${schedule.id}`)) this.client.settings.remove('tweet', { _id: schedule._id });
		this.client.twitter.reply(schedule.text, schedule.replyToID);
	}

	private queue(schedule: Tweet): void {
		this.client.logger.info(
			`[SCHEDULE HANDLER] Setting ${schedule.id} timeout, ${(schedule.triggerAt.getTime() - Date.now()) /
				1000} seconds left.`,
		);
		this.client.settings.remove('tweet', { _id: schedule._id });
		this.waiting.add(`${schedule.id}`);
		setTimeout(() => {
			this.fire(schedule);
			this.waiting.delete(`${schedule.id}`);
		}, schedule.triggerAt.getTime() - Date.now());
	}

	private _check(): void {
		const schedules = this.client.settings.tweet;
		const now = new Date();
		if (!schedules.size) return;
		this.client.logger.debug(`[SCHEDULE HANDLER] Checking ${schedules.size} schedules.`);
		for (const m of schedules.values()) {
			if (!m.triggerAt || m.triggerAt.getDate() !== now.getDate()) this.client.settings.remove('tweet', { _id: m._id });
			else if (m.triggerAt.getTime() - now.getTime() <= this.rate) this.queue(m);
			else if (!this.waiting.has(`${m.id}`) && now.getTime() > m.triggerAt.getTime()) this.fire(m);
		}
	}
}
