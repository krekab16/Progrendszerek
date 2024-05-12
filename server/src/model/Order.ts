import mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', 
    }],
    
});

export interface IOrder extends mongoose.Document {
    userId: string;
    event: string;
}

export const Order: mongoose.Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);