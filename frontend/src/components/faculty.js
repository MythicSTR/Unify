import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Course.css";
import Header from "./Header";
import Navbar from "./AdminNavbar";
import { getCookie } from "../utils.js";

function Faculty() {
  const [faculty_id, setFacultyId] = useState();
  const [first_name, setFName] = useState("");
  const [last_name, setLName] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [provience, setprovience] = useState("");
  const [district, setDistrict] = useState("");
  const [street_address, setSaddress] = useState("");
  const [city, setCity] = useState("");
  const [phone_number, setPnumber] = useState("");
  const [hire_date, setHdate] = useState("");
  const [Department, setdepartment] = useState("");

  const navigate = useNavigate();

  const FacultyInfo = async () => {
    let formField = new FormData();

    formField.append("faculty_id", faculty_id);
    formField.append("First_name", first_name);
    formField.append("Last_name", last_name);
    formField.append("DOB", date_of_birth);
    formField.append("email", email);
    formField.append("country", country);
    formField.append("provience", provience);
    formField.append("district", district);
    formField.append("street_address", street_address);
    formField.append("city", city);
    formField.append("DOB", date_of_birth);
    formField.append("phone_number", phone_number);
    formField.append("hire_date", hire_date);
    formField.append("Department", Department);

    try {
      axios
        .post("http://127.0.0.1:8000/api/course/", formField, {
          headers: { "X-CSRFToken": getCookie("csrftoken") },
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group">
 <div className="border p-4 w-25 position-relative ">
        <div className="form-group">
        <label for="exampleFormControlInput1" className="form-label">
          Faculty ID
        </label>
        <input
          type="text"
          className="form-control w-100"
          placeholder="1"
          name="faculty_id"
          value={faculty_id}
          onChange={(e) => setFacultyId(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          First Name
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="First Name"
          name="first_name"
          value={first_name}
          onChange={(e) => setFName(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea2" class="form-label">
          last Name
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="Last Name"
          name="last_name"
          value={last_name}
          onChange={(e) => setLName(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea3" class="form-label">
          Date Of Birth
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="YYYY-MM-DD"
          name="date_of_bith"
          value={date_of_birth}
          onChange={(e) => setDOB(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea4" class="form-label">
          E-mail
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="example@gamil.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea5" class="form-label">
          Country
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="Nepal"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea6" class="form-label">
          Province
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="provience"
          name="province"
          value={provience}
          onChange={(e) => setprovience(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea7" class="form-label">
          District
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="District"
          name="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea8" class="form-label">
          Street address
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder=""
          name="street address"
          value={street_address}
          onChange={(e) => setSaddress(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea9" class="form-label">
          city
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder=""
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea0" class="form-label">
          Phone Number
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="98********"
          name="phone number"
          value={phone_number}
          onChange={(e) => setPnumber(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea11" class="form-label">
          Hire Date
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="YYYY-MM-DD"
          name="hire_date"
          value={hire_date}
          onChange={(e) => setHdate(e.target.value)}
          />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea12" class="form-label">
          Department
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="School of Science"
          name="Department"
          value={Department}
          onChange={(e) => setdepartment(e.target.value)}
          />
      </div>
      <div class="row mb-3 align-self-center">
        <input
          type="submit"
          class="col btn btn-primary m-0 align-self-center"
          value="Submit"
          onClick={FacultyInfo}
          />
          
              </div>
      </div>
    </div>
  );
}

export default Faculty;
