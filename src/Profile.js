import React, { useState } from "react";
import "./Profile.css";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [updatedUserData, setUpdatedUserData] = useState({
    userId: userId,
    age: "",
    gender: "",
    dob: "",
    mobile: "",
  });
  const [message, setMessage] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  const handleChange = (e) => {
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .put("https://guvitask-jbma.onrender.com/api/update", updatedUserData)
      .then((response) => {
        if (response.status === 200) {
          setUpdatedData(response.data.return);
          setMessage("User details updated successfully");
          setIsUpdated(true);
        } else {
          return response.json().then((data) => {
            setMessage(`Failed to update user details: ${data.message}`);
          });
        }
      })
      .catch((error) => {
        console.error("Error updating user details:", error.message);
        setMessage(`Error updating user details: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="profile-wrapper">
      <Container
        className={`d-flex justify-content-center align-items-center ${
          isUpdated ? "expanded" : ""
        }`}
      >
        <div className="shadow-lg blur-background p-5 rounded-4">
        <div className="btn">
          <Button onClick={handleLogout}>Logout</Button>
          </div>
          <h2 className="profile-heading">Profile</h2>
          
          {message && <div className="message">{message}</div>}
          <div className="profile-details">
            <form onSubmit={handleSubmit}>
              <div className="profile-detail">
                <label>Age:</label>
                <input
                  type="text"
                  name="age"
                  value={updatedUserData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-detail">
                <label>Gender:</label>
                <input
                  type="text"
                  name="gender"
                  value={updatedUserData.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-detail">
                <label>Date of Birth (DOB):</label>
                <input
                  type="date"
                  name="dob"
                  value={updatedUserData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-detail">
                <label>Mobile:</label>
                <input
                  type="text"
                  name="mobile"
                  value={updatedUserData.mobile}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </form>
          </div>
          {isUpdated && (
            <div className="updated-details-container">
              <h3>Updated Details:</h3>
              <p>Age: {updatedData.age}</p>
              <p>Gender: {updatedData.gender}</p>
              <p>Date of Birth (DOB): {updatedData.dob}</p>
              <p>Mobile: {updatedData.mobile}</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Profile;
