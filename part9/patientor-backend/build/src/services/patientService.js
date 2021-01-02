"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const entries = patients_json_1.default;
const getEntries = () => {
    return entries;
};
const getNonSsnEntries = () => {
    return entries.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};
const addEntries = () => {
    return null;
};
exports.default = {
    getEntries,
    getNonSsnEntries,
    addEntries
};
