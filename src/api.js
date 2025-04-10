import axios from "axios"

const API_URL = "http://127.0.0.1:8000";  // Backend URL

export const fetchPatients = async() => {
    const response = await axios.get(`${API_URL}/patients/`)
    return response.data
};

export const addPatient = async (patientData) => {
    const response = await axios.post(`${API_URL}/patients/`, patientData, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};