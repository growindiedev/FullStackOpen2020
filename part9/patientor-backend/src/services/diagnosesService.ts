import diagnosesData from '../../data/diagnoses.json';
import {diagnosesEntry} from '../types/diagnosesEntry';

const entries: diagnosesEntry[] = diagnosesData;

const getEntries = (): diagnosesEntry[] => {
    return entries;
};

const addEntries = (): null => {
    return null;
};

export default {
    getEntries,
    addEntries
};

