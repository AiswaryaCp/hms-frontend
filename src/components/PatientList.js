import React, { useEffect, useState } from "react";
import { fetchPatients, addPatient } from "../api";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        patient_mrn:"",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "Male",
        phone_number: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        fetchPatients().then(data => setPatients(data));
    }, []);

    const handleChange = (e) => {
        setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addedPatient = await addPatient(newPatient);
        setPatients([...patients, addedPatient]);
        setNewPatient({ patient_mrn:"", first_name: "", last_name: "", date_of_birth: "", gender: "Male", phone_number: "", email: "", address: "", });
    };

    return (
        <div>
            <h2>Patient List</h2>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>MRN</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.length > 0 ? (
                            patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.patient_mrn}</td>
                                    <td>{patient.first_name} {patient.last_name}</td>
                                    <td>{patient.date_of_birth}</td>
                                    <td>{patient.gender}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No Patients Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            <h3>Add New Patient</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" value={newPatient.first_name} onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Last Name" value={newPatient.last_name} onChange={handleChange} required />
                <input type="date" name="date_of_birth" value={newPatient.date_of_birth} onChange={handleChange} required />
                <select name="gender" value={newPatient.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" name="phone_number" placeholder="Phone Number" value={newPatient.phone_number} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={newPatient.email} onChange={handleChange} />
                <textarea name="address" placeholder="Address" value={newPatient.address} onChange={handleChange}></textarea>
                <button type="submit">Add Patient</button>
            </form>
        </div>
    );
};

export default PatientList;
