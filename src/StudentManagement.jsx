import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md'; // Import edit and delete icons

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [globalId, setGlobalId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        grade: '',
        degree: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addStudent = () => {
        const { name, email, age, grade, degree } = formData;

        if (globalId !== null) {
            setStudents((prev) =>
                prev.map((student) =>
                    student.ID === globalId ? { ...student, ...formData } : student
                )
            );
            setGlobalId(null);
        } else {
            if (!name || !email || !age || !grade || !degree) {
                alert("All fields are required!");
                return;
            }
            const newStudent = {
                ID: students.length + 1,
                ...formData
            };
            setStudents([...students, newStudent]);
        }

        setFormData({
            name: '',
            email: '',
            age: '',
            grade: '',
            degree: ''
        });
    };

    const editStudent = (id) => {
        const student = students.find((s) => s.ID === id);
        if (student) {
            setFormData(student);
            setGlobalId(id);
        }
    };

    const deleteStudent = (id) => {
        setStudents(students.filter((student) => student.ID !== id));
    };

    const searchStudents = (e) => {
        const filter = e.target.value.toUpperCase();
        const filteredStudents = students.filter((student) =>
            Object.values(student).some((value) =>
                value.toString().toUpperCase().includes(filter)
            )
        );
        setStudents(filteredStudents);
    };

    return (
        <div className="container">
            <h1>Nairobits Student Management System</h1>
            <div className="input-container">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="text" name="grade" placeholder="Total Grades" value={formData.grade} onChange={handleChange} />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                <input type="text" name="degree" placeholder="Specialisation" value={formData.degree} onChange={handleChange} />
            </div>
            <button className="button" type="button" onClick={addStudent}>
                {globalId !== null ? "Edit Student" : "Add Student"}
            </button>
            <input className="search" type="text" id="search" onChange={searchStudents} placeholder="Search By Name, email or specialization" />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Grades</th>
                        <th>Specialization</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.ID}>
                            <td>{student.ID}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>
                            <td>
                                <div className="degree">
                                    <div>{student.degree}</div>
                                    <div className="icons">
                                        <a onClick={() => editStudent(student.ID)} className="fa" title="Edit">
                                            <MdEdit size={24} color="#F7A31A" /> {/* Edit icon */}
                                        </a>
                                        <a onClick={() => deleteStudent(student.ID)} className="fa" title="Delete">
                                            <MdDelete size={24} color="#F7A31A" /> {/* Delete icon */}
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentManagement;
