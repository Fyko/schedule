import twit, { Twitter  } from 'twit';
import Client from '../client/Client';
import fetch from 'node-superfetch';

export default class RESTHandler {
    protected client: Client;

    public twitter: twit;

    constructor(client: Client) {
        this.client = client;
        this.twitter = new twit(this.client.config);
    }

    public async tweet(content: string, images: string[] = []): Promise<Twitter.Status | null> {
        if (images.length) {
            this.client.logger.info(`[PROCESSING TWEET] Encoding ${images.length} images!`);
            const _encode = images.map((i: string) => this.encode(i));
            const encoded = await Promise.all(_encode);
            images = encoded;
        }

        this.client.logger.info(`[PROCESSING TWEET] Sending tweet.`)
        try {
            const status = await this.update(content, images);
            return status;
        } catch (err) {
            this.client.logger.error(`[ERROR ON TWEET]: ${err}`);
            return null;
        }
    }

    public async update(item: string, imgs: string[]): Promise<Twitter.Status | null> {
        try {
            const post = await this.twitter.post('statuses/update', { media_ids: imgs, status: item });        
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
        const { body } = await fetch.get(link);
        return Buffer.from(body.toString()).toString('base64');
    }
}