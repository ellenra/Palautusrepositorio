export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: BaseEntry[];
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  description: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employer: string;
  sickLeave?: {
      startDate: string;
      endDate: string;
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
      date: string;
      criteria: string;
  }
}

export type Entry = 
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry

export type PatientFormValues = Omit<Patient, "id" | "entries">;