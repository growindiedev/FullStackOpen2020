"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const entries = patients_json_1.default;
const getEntries = () => {
    return entries;
};
const getNonSsnEntries = () => {
    return entries.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};
const addEntries = (entry) => {
    const newPatientEntry = Object.assign({ id: uuid_1.v4() }, entry);
    entries.push(newPatientEntry);
    return newPatientEntry;
};
const findById = (id) => {
    const entry = entries.find(e => e.id === id);
    return entry;
};
exports.default = {
    getEntries,
    getNonSsnEntries,
    addEntries,
    findById
};
