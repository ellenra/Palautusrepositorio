import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(( { id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
        const newPatient = {
            id: uuid(),
            ...entry
        };
        patients.push(newPatient);
        return newPatient;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(d => d.id === id);
    return patient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addPatient
};