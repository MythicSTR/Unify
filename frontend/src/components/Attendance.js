import React from 'react';
import {getCookie} from '../utils.js';
import axios from 'axios';

import Header from "../components/Header";
import Navbar from "../components/FacultyNavbar";
import useGeolocation from '../hooks/useGeolocation';

function Attendance() {
    const location = useGeolocation();
    

    const SaveLocationInfo = async() => {
        let formField = new FormData()

        formField.append('faculty_id', 1)
        formField.append('lat', location.coordinates.lat)
        formField.append('lng', location.coordinates.lng)

        try {
            axios.post("http://127.0.0.1:8000/attendance/faculty/", formField, {headers: {'X-CSRFToken': getCookie('csrftoken')}}).then((response) => {
                console.log(response.data)
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div>
            {/* {location.loaded ? JSON.stringify(location) : "location data not available!"} */}
            <button class="btn btn-primary" type="submit" onClick={SaveLocationInfo}>Save Location</button>
        </div>
    )
}

export default Attendance;