import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const UpdateStudent = () => {
  const { id } = useParams();
  const [value, setValue] = useState({
    studentID: "",
    name: "",
    phone: "",
    email: "",
    grades: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/students/${id}`);
        const data = await response.json();
        if (data?.student) {
          setValue({
            studentID: data.student.studentID,
            name: data.student.name,
            phone: data.student.phone,
            email: data.student.email,
            grades: data.student.grades,
          });
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [id]); 


  const setData = (e) => {
    const { name, value } = e.target;

    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/students/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
          }
        );

        if (response.ok) {
          // Redirect or perform any other action upon successful update
          console.log("Student updated successfully!");
          // Reset form data after successful update
          setValue({
            studentID: "",
            name: "",
            phone: "",
            email: "",
            grades: "",
          });
          navigate("/"); 
        } else {
          console.error("Error updating student:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating student:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Link to="/" className="btn btn-secondary mt-4 mb-4">
            Back to Home
          </Link>

          <div className="card">
            <div className="card-header">
              <h3 className="mb-0"> Update Student Information</h3>
            </div>
            <div className="card-body">
              <form onSubmit={updateStudent}>
            
                <div className="form-group">
                  <label htmlFor="studentID">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentID"
                    placeholder="Student ID"
                    onChange={setData}
                    value={value.studentID}
                    name="studentID"
                  />
                </div>

           
                <div className="form-group mt-2">
                  <label htmlFor="studentName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentName"
                    placeholder="Student Name"
                    onChange={setData}
                    value={value.name}
                    name="name"
                  />
                </div>

                
                <div className="form-group mt-2">
                  <label htmlFor="studentPhone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentPhone"
                    placeholder="Student Phone"
                    onChange={setData}
                    value={value.phone}
                    name="phone"
                  />
                </div>

               
                <div className="form-group mt-2">
                  <label htmlFor="studentEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="studentEmail"
                    placeholder="Student Email"
                    onChange={setData}
                    value={value.email}
                    name="email"
                  />
                </div>

            
                <div className="form-group mt-2">
                  <label htmlFor="studentGrade">Grade</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentGrade"
                    placeholder="Student Grade"
                    onChange={setData}
                    value={value.grades}
                    name="grades"
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                  {loading ? (
                    <BarLoader
                      color={"#ffffff"}
                      loading={loading}
                      css={override}
                      size={150}
                    />
                  ) : (
                    "Update"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
