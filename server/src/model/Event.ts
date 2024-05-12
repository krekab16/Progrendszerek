import mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    location: String,
    description: String,
    ticketPrice: Number,
    ticketNumber: Number,
    ticketCategory: String
});

export interface IEvent extends mongoose.Document {
    name: string;
    date: Date;
    location: string;
    description: string;
    ticketPrice: number;
    ticketNumber: number;
    ticketCategory: string;
}

export const Event: mongoose.Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);