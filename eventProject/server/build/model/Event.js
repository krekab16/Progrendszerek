"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.EventSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.EventSchema = new mongoose_1.default.Schema({
    name: String,
    date: Date,
    location: String,
    description: String,
    ticketPrice: Number,
    ticketNumber: Number,
    ticketCategory: String
});
exports.Event = mongoose_1.default.model('Event', exports.EventSchema);
