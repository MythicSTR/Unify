import React from 'react';

import "../styles/Admin.css";
import Header from "../components/Header";
import Navbar from "../components/AdminNavbar";
import AddSchool from "../components/AddSchool";

function Admin(props) {
    return (
        <div>
            <Header />
            <Navbar />
            {props.school && <AddSchool/>}
        </div>
    );
}

export default Admin;