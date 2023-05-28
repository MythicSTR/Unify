import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

import Header from "../Header";
import Navbar from "./AdminNavbar";
import {getCookie} from '../../utils.js';

function AddSchool() {
    const [id, setId] = useState();
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const AddSchoolInfo = async() => {
        let formField = new FormData()

        formField.append('school_id', id)
        formField.append('name', name)

        try {
            axios.post("http://127.0.0.1:8000/api/addschool/", formField, {headers: {'X-CSRFToken': getCookie('csrftoken')}}).then((response) => {
                console.log(response.data)
                window.alert("School added successfully");
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="border w-25 p-4 position-absolute top-50 start-50 translate-middle">
            <div className="form-group">
                <label for="exampleFormControlInput1" className="form-label">School ID</label>
                <input
                    type="text"
                    className="form-control w-100"
                    placeholder="e.g. SOS"
                    name="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1" class="form-label">School Name</label>
                <input
                    type="text"
                    class="form-control w-100"
                    placeholder="School of Science"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div class="row mb-3 align-self-center">
                <input
                    type="submit"
                    class="col btn btn-primary m-0 align-self-center"
                    value="Submit"
                    onClick={AddSchoolInfo}   
                />
            </div>
        </div>
    );
}

export default AddSchool;