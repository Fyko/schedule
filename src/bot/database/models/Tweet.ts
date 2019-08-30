import { Document, Schema, model } from 'mongoose';
import { Schedule } from '../../util/Constants';

export interface Tweet extends Document {
    schedule: Schedule;
    tweetID: string;
    nextEvent: number;
    createdAt: Date;
}

const Tweet: Schema = new Schema({
    tweetID: {
        type: String,
        required: true
    },
    nextEvent: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    schedule: {
        type: Object,
        required: true
    }
}, {
    strict: false
});

export default model<Tweet>('Tweet', Tweet);