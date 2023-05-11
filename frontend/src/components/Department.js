import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import Navbar from "./AdminNavbar";
import { getCookie } from "../utils.js";

function Department() {
  const [department_id, setDepartId] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [school, setSchool] = useState("");

  

  const DepartmentInfo = async () => {
    let formField = new FormData();

    formField.append("department_id", department_id);
    formField.append("name", name);
    formField.append("description", description);
    formField.append("school", school);

    try {
      axios
        .post("http://127.0.0.1:8000/api/department/", formField, {
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
    
    <div className="border w-25 p-4 position-absolute top-50 start-50 translate-middle">
      <div className="form-group">
        <label for="exampleFormControlInput4" className="form-label">
          Department ID
        </label>
        <input
          type="text"
          className="form-control w-100"
          placeholder="1"
          name="department_id"
          value={department_id}
          onChange={(e) => setDepartId(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          Username
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="Username"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea3" class="form-label">
          Description
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea2" class="form-label">
          School Name
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="School of Science"
          name="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </div>
      <div class="row mb-3 align-self-center">
        <input
          type="submit"
          class="col btn btn-primary m-0 align-self-center"
          value="Submit"
          onClick={DepartmentInfo}
        />
      </div>
    </div>
  );
}

export default Department;
