"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.CartSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CartSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    event: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Event',
    },
});
exports.Cart = mongoose_1.default.model('Cart', exports.CartSchema);
