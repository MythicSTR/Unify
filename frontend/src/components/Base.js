import React from "react";
import Navbar from "./StudentNavbar";
import "../styles/Base.css";
import GetImage from "./GetImage";
import { useParams } from "react-router-dom";

function Base(props){
    const {course_code, program_id} = useParams();
    console.log(course_code);
    return(
        <div>
        <Navbar />
        <div className="main-base-container">
        <h4>Welcome to class {course_code}</h4>
        </div>
        <GetImage/>
        </div>
    );
}
export default Base;