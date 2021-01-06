type gender = "male" | "felmale";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
    
}



export interface patientEntry {
        id: string;
        name: string;
        ssn: string;
        occupation: string;
        gender: gender;
        dateOfBirth: string;
        entries?: Entry[]
      }

export type PublicPatient = Omit<patientEntry, 'ssn' | 'entries'>;