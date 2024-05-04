import { Document, Schema, model } from 'mongoose';

export interface IComment extends Document {
    ID: string;
    userID: string;
    characterID: string;
    comment: string;
}

const schema = new Schema<IComment>({
    ID: { type: String, required: true, unique: true, index: true, auto: true },
    userID: { type: String, required: true },
    characterID: { type: String, required: true },
    comment: { type: String, required: true },
},
{
    timestamps: true
});

export default model<IComment>('comment', schema);