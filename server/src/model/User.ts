import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    orders: [],
});

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    orders: [];
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

const SALT_FACTOR = 10;

UserSchema.pre('save', function preSaveCallback(next) {
    const _this = this as any;

    bcrypt.genSalt(SALT_FACTOR, function genSaltCallback(error, salt) {
        if (error) {
            return next(error);
        }

        bcrypt.hash(_this.password, salt, function hashCallback(error2, hash) {
            if (error2) {
                return next(error2);
            }
            _this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function comparePassword(password: any, cb: any) {
    const _this = this as any;
    bcrypt.compare(password, _this.password, function compareCallback(error, isMatch) {
        if (error) {
            return cb(error);
        }
        cb(null, isMatch);
    });
}

export const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema);