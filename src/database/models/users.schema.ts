import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    middleName: string;
    lastName: string;
    countryID: string;
    email: string;
    password: string;
}

const schema = new Schema<IUser>({
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    countryID: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
},
{
    timestamps: true
});

export default model<IUser>('user', schema);

