"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.UserSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    name: String,
    orders: [],
});
const SALT_FACTOR = 10;
exports.UserSchema.pre('save', function preSaveCallback(next) {
    const _this = this;
    bcrypt_1.default.genSalt(SALT_FACTOR, function genSaltCallback(error, salt) {
        if (error) {
            return next(error);
        }
        bcrypt_1.default.hash(_this.password, salt, function hashCallback(error2, hash) {
            if (error2) {
                return next(error2);
            }
            _this.password = hash;
            next();
        });
    });
});
exports.UserSchema.methods.comparePassword = function comparePassword(password, cb) {
    const _this = this;
    bcrypt_1.default.compare(password, _this.password, function compareCallback(error, isMatch) {
        if (error) {
            return cb(error);
        }
        cb(null, isMatch);
    });
};
exports.User = mongoose_1.default.model('User', exports.UserSchema);
