import React, { useEffect } from "react";
import Navbar from "./StudentNavbar";
import "../styles/Base.css";
import GetImage from "./GetImage";
import { useParams } from "react-router-dom";
import { useState } from "react";

import jwt_decode from "jwt-decode";
function Base(props) {
    const { course_code } = useParams();
    const token = localStorage.getItem("jwtToken");
    const user = jwt_decode(token);
    const [inputData, setInputData] = useState('');

    const handleInputChange = (event) => {
        setInputData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


         // Prepare the data to be sent
        const data = {
            notice: inputData,
            course_code: course_code,
            user_id: user.user_id
        };
        fetch("http://localhost:8000/addclassnotice/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // Handle the response from the backend API
                if (response.status == 400) {
                    window.alert("notice added to the class!");
                } else {
                    console.error("Error:", response.statusText);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };


    return (
        <div>
            <Navbar />
            <div className="main-base-container">
                <h4>Welcome to class {course_code}</h4>
            </div>
            <GetImage />
            <div className="base-notice-section">
                <h3>Notice</h3>
                {!user.isStudent &&
                    <div className="notice">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="inputData">Add a notice:</label>
                            <input
                                type="text"
                                id="inputData"
                                className="notice-input-field"
                                name="inputData"
                                value={inputData}
                                onChange={handleInputChange}
                                style={{ width: '50rem', height: '7rem' }}
                            />
                            <button type="submit" className="Submit-Button-Notice">Submit</button>
                        </form>
                    </div>}


            </div>
        </div>
    );
}

export default Base;

