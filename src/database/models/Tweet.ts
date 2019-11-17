import { Document, Schema, model } from 'mongoose';

export interface Tweet extends Document {
	replyToID: string;
	text: string;
	triggerAt: Date;
}

const Tweet: Schema = new Schema(
	{
		replyToID: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		triggerAt: {
			type: Date,
			required: true,
		},
	},
	{
		strict: false,
	},
);

export default model<Tweet>('Tweet', Tweet);
