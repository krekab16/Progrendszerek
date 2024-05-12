import mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', 
    },
    
});

export interface ICart extends mongoose.Document {
    userId: string;
    event: string;
}

export const Cart: mongoose.Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);