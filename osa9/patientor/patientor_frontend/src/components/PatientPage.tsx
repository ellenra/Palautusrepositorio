import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses"
import { Diagnosis, Patient } from "../types"
import { useState, useEffect } from 'react';

interface DiagnoseProps {
    code: string,
    diagnoses: Diagnosis[]
}

const DiagnosisList = ({ code, diagnoses }: DiagnoseProps) => {
    const diagnosisText = (code: string): string | undefined => {
        return diagnoses.find(diagnosis => diagnosis.code === code)?.name;
    };

    return (
        <>
            {code}  {diagnosisText(code)}
        </>
    )
}


const PatientPage = () => {
    const [patient, setPatient] = useState<Patient | undefined >();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const id = useParams().id;

    useEffect(() => {    
        const fetchPatient = async (id: string) => {
          const data = await patientService.getPatient(id);
          setPatient(data);
        };
        const fetchDiagnoses = async () => {
            const data = await diagnosesService.getAll()
            console.log(data)
            setDiagnoses(data)
        };
        if (id) {
        void fetchPatient(id);
        void fetchDiagnoses();
        }
    }, [id]);

    
    if (patient) {
        return (
            <div>
                <Typography variant="h6" style={{ marginTop: "2em" }}>
                    {patient.name}
                </Typography>
                <Typography style={{ marginBottom: "1em" }}>
                    {patient.dateOfBirth}
                </Typography>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <p>gender: {patient.gender}</p>
                <Typography style={{ marginTop: "2em" }}>
                    Entries:
                </Typography>
                <div>{patient.entries?.map((entry) => (
                    <div key={entry.id}>
                        <p>Date: {entry.date}</p>
                        <p>Description: {entry.description}</p>
                        {entry.diagnosisCodes?.map(i => (
                            <li key={i}><DiagnosisList code={i} diagnoses={diagnoses} /></li>
                        ))}
                    </div>
                ))}</div>
            </div>
        )
    }
};

export default PatientPage