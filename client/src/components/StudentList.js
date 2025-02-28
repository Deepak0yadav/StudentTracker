import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/students`);
      const data = await response.json();
      setStudents(data.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteClick = (studentId) => {
    setSelectedStudentId(studentId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
     
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/students/${selectedStudentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        
        console.log("Student deleted successfully!");
        setDeleteModalOpen(false);
        fetchData();
      } else {
        console.error("Error deleting student:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add-btn-container mt-2 text-center">
          <Link to="/StudentForm">
            <button className="btn btn-primary">Add Student</button>
          </Link>
        </div>

        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Student ID</th>
              <th scope="col">Student Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Grades</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <th scope="row">{student.studentID}</th>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>{student.grades}</td>
                <td className="d-flex justify-content-around">
                  <Link to={`/UpdateStudent/${student._id}`}>
                    <button className="btn btn-primary" title="Edit">
                      <EditIcon style={{ fontSize: 18 }} />
                    </button>
                  </Link>

                  <button
                    className="btn btn-danger"
                    title="Delete"
                    onClick={() => handleDeleteClick(student._id)}
                  >
                    <DeleteIcon style={{ fontSize: 18 }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteConfirmation}
        />
      </div>
    </div>
  );
};

export default StudentList;
