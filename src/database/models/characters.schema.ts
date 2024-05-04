import { Document, Schema, model } from 'mongoose';

export interface ICharacter extends Document {
    ID: string;
    name: string;
    pronunciation: string;
    meaningSpanish: string;
    meaningEnglish: string;
    meaningPortuguese: Date;
    countryID: Date;
    description: string;
}

const schema = new Schema<ICharacter>({
    ID: { type: String, required: true, unique: true, index: true, auto: true },
    name: { type: String, required: true },
    pronunciation: { type: String, required: true },
    meaningSpanish: { type: String, required: true },
    meaningEnglish: { type: String, required: true },
    meaningPortuguese: { type: Date, required: true },
    countryID: { type: Date, required: true },
    description: { type: String, required: true },
});