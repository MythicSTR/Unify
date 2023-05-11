import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import Navbar from "./AdminNavbar";
import { getCookie } from "../utils.js";

function Building() {
  const [building_id, setBId] = useState();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const BuildingInfo = async () => {
    let formField = new FormData();

    formField.append("building_id", building_id);
    formField.append("name", name);
    formField.append("code", code);
    formField.append("description", description);

    try {
      axios
        .post("http://127.0.0.1:8000/api/building/", formField, {
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
        <label for="exampleFormControlInput1" className="form-label">
          Building ID
        </label>
        <input
          type="text"
          className="form-control w-100"
          placeholder="1"
          name="building_id"
          value={building_id}
          onChange={(e) => setBId(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea2" class="form-label">
          Name
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder=""
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea3" class="form-label">
          code
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder=""
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea4" class="form-label">
          Description
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder=""
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div class="row mb-3 align-self-center">
        <input
          type="submit"
          class="col btn btn-primary m-0 align-self-center"
          value="Submit"
          onClick={BuildingInfo}
        />
      </div>
    </div>
  );
}

export default Building;
