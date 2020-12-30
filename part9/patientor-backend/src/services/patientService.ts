import patients from '../../data/patients.json';
import {patientEntry} from '../types/patientEntry';

const entries: patientEntry[]  = patients;

const getEntries = (): patientEntry[] => {
    return entries;
};

const getNonSsnEntries = (): Omit<patientEntry, 'ssn'>[] => {
    return entries.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addEntries = (): null => {
    return null;
};

export default {
    getEntries,
    getNonSsnEntries,
    addEntries
};