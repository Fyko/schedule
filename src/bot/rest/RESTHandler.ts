import twit, { Twitter } from 'twit';
import Client from '../client/Client';
const { get } = require('node-superfetch'); // eslint-disable-line

export default class RESTHandler {
	protected client: Client;

	public twitter: twit;

	public constructor(client: Client) {
		this.client = client;
		this.twitter = new twit({
			consumer_key: process.env.CONSUMER_KEY!,
			consumer_secret: process.env.CONSUMER_KEY_SECRET!,
			access_token: process.env.API_KEY!,
			access_token_secret: process.env.API_KEY_SECRET!,
		});
	}

	public async tweet(content: string, images: string[] = []): Promise<Twitter.Status | null> {
		this.client.logger.info(`[PROCESSING TWEET] Encoding ${images!.length} images.`);
		const encodedImages: string[] = [];
		for (const i of images) {
			const str = await this.encode(i);
			encodedImages.push(str);
		}

		/* uploading images to twitter because twitter is still retarded */
		this.client.logger.info(`[PROCESSING TWEET] Uploading ${images!.length} images.`);
		const mediaIDs = [];
		for (const m of encodedImages) {
			const up = await this.upload(m);
			if (!up) continue;
			mediaIDs.push(up);
		}

		this.client.logger.info(`[PROCESSING TWEET] Sending tweet.`);
		try {
			const status = await this.update(content, mediaIDs);
			return status;
		} catch (err) {
			this.client.logger.error(`[ERROR ON TWEET]: ${err}`);
			return null;
		}
	}

	public async update(status: string, imgs: string[]): Promise<Twitter.Status | null> {
		const opts = imgs ? { media_ids: imgs, status } : { status };
		try {
			const post = await this.twitter.post('statuses/update', opts);
			const body = post.data as Twitter.Status;
			return body && body.id_str ? body : null;
		} catch (err) {
			this.client.logger.error(`[ERROR ON UPDATE]: ${err}`);
		}
		return null;
	}

	public async reply(item: string, tweetID: string): Promise<Twitter.Status | null> {
		try {
			const post = await this.twitter.post('statuses/update', { status: item, in_reply_to_status_id: tweetID });
			const body = post.data as Twitter.Status;
			return body && body.id_str ? body : null;
		} catch (err) {
			this.client.logger.error(`[ERROR ON REPLY]: ${err}`);
		}
		return null;
	}

	public async upload(data: string): Promise<string | null> {
		const post = await this.twitter.post('media/upload', { media_data: data });
		const body = post.data as any;

		if (body.media_id_string) return body.media_id_string.toString();
		return null;
	}

	public async encode(link: string): Promise<any> {
		const { body } = await get(link);
		return Buffer.from(body).toString('base64');
	}
}
