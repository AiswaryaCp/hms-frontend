import React, { useEffect, useState } from "react";
import { fetchPatients, addPatient } from "../api";
import DataTable from 'react-data-table-component';
import "./PatientList.css"


const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [filterText, setFilterText] = useState("");
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
        setShowModal(false);
    };
    const [showModal, setShowModal] = useState(false);

    const columns = [
        {
            name: 'MRN',
            selector: row => row.patient_mrn,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => `${row.first_name} ${row.last_name}`,
            sortable: true,
        },
        {
            name: 'DOB',
            selector: row => row.date_of_birth,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
    ];

    const customStyles = {
        table: {
            style: {
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                width: '95%',
                margin: '0 auto',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#123357',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
                color: '#333',
            },
        },
    };

    const filteredPatients = patients.filter((patient) =>
        Object.values(patient)
            .join(" ")
            .toLowerCase()
            .includes(filterText.toLowerCase())
    );
    

    return (
        <div>
            <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p></p>
                <button className="button-add-patient" onClick={() => setShowModal(true)}>+ Add Patient</button>
            </h2>

            <DataTable
                columns={columns}
                data={filteredPatients}
                pagination
                highlightOnHover
                pointerOnHover
                striped
                noDataComponent="No Patients Found"
                customStyles={customStyles}
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="patient-search-input"
                        style={{
                            padding: "8px",
                            width: "300px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            marginLeft: "10px"
                        }}
                    />
                }
            />

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Add New Patient</h3>
                            <button className="close-button" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
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
                            <div className="modal-buttons">
                                <button className="button-modal-add" type="submit">Add Patient</button>
                                <button className="button-modal-cancel" type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PatientList;
