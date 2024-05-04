import { Document, Schema, model } from 'mongoose';

export interface ICountry extends Document {
    name: string;
    shortName: string;
    flag: string;
}

const schema = new Schema<ICountry>({
    name: { type: String, required: true },
    shortName: { type: String },
    flag: { type: String},
});

export default model<ICountry>('country', schema);