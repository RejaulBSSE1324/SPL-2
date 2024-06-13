"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [editStudent, setEditStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5555/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5555/students/${id}`);
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const saveStudent = async () => {
        try {
            if (editStudent._id) {
                await axios.put(`http://localhost:5555/students/${editStudent._id}`, editStudent);
            } else {
                await axios.post('http://localhost:5555/students', editStudent);
            }
            setEditStudent(null);
            fetchStudents();
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    return (
        <div>
            <h2>Student List</h2>
            <button onClick={() => setEditStudent({ firstname: '', lastname: '', regi_number: '', departmant_name: '', session: '', study_year: '', email: '', mobile: '', password: '' })}>
                Add Student
            </button>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>
                        {student.firstname} {student.lastname} ({student.regi_number})
                        <button onClick={() => setEditStudent(student)}>Edit</button>
                        <button onClick={() => deleteStudent(student._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editStudent && (
                <div>
                    <h3>{editStudent._id ? 'Edit Student' : 'Add Student'}</h3>
                    <form onSubmit={(e) => { e.preventDefault(); saveStudent(); }}>
                        <input type="text" placeholder="First Name" value={editStudent.firstname} onChange={(e) => setEditStudent({ ...editStudent, firstname: e.target.value })} />
                        <input type="text" placeholder="Last Name" value={editStudent.lastname} onChange={(e) => setEditStudent({ ...editStudent, lastname: e.target.value })} />
                        <input type="text" placeholder="Registration Number" value={editStudent.regi_number} onChange={(e) => setEditStudent({ ...editStudent, regi_number: e.target.value })} />
                        <input type="text" placeholder="Department" value={editStudent.departmant_name} onChange={(e) => setEditStudent({ ...editStudent, departmant_name: e.target.value })} />
                        <input type="text" placeholder="Session" value={editStudent.session} onChange={(e) => setEditStudent({ ...editStudent, session: e.target.value })} />
                        <input type="text" placeholder="Year of Study" value={editStudent.study_year} onChange={(e) => setEditStudent({ ...editStudent, study_year: e.target.value })} />
                        <input type="email" placeholder="Email" value={editStudent.email} onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })} />
                        <input type="text" placeholder="Mobile" value={editStudent.mobile} onChange={(e) => setEditStudent({ ...editStudent, mobile: e.target.value })} />
                        <input type="password" placeholder="Password" value={editStudent.password} onChange={(e) => setEditStudent({ ...editStudent, password: e.target.value })} />
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}
