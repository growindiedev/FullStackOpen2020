type gender = "male" | "felmale";
export interface patientEntry {
        id: string,
        name: string,
        dateOfBirth: string,
        ssn: string,
        gender: gender,
        occupation:string 
    }

export type newPatientEntry = Omit<patientEntry, 'id'>;