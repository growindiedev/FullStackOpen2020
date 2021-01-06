import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients.json';
import {patientEntry, PublicPatient} from '../types/patientEntry';

const entries: patientEntry[]  = patients as patientEntry[];

const getEntries = (): patientEntry[] => {
    return entries;
};

const getNonSsnEntries = (): PublicPatient[] => {
    return entries.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addEntries = (entry: Omit<patientEntry, 'id' | 'entries'>): patientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
    };
    entries.push(newPatientEntry);
    return newPatientEntry;
};

const findById = (id: string): patientEntry | undefined => {
    let patient = entries.find( e => e.id === id);
    if (patient && !patient?.entries)
    patient = {
      ...patient,
      entries: [],
    };

  return patient;
};

export default {
    getEntries,
    getNonSsnEntries,
    addEntries,
    findById
};