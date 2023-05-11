import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import Navbar from "./AdminNavbar";
import { getCookie } from "../utils.js";

function Room() {
  const [room_id, setRId] = useState();
  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [building, setBuilding] = useState("");

  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const RoomInfo = async () => {
    let formField = new FormData();

    formField.append("room_id", room_id);
    formField.append("number", number);
    formField.append("capacity", capacity);
    formField.append("building", building);

    formField.append("description", description);

    try {
      axios
        .post("http://127.0.0.1:8000/api/room/", formField, {
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
          Room ID
        </label>
        <input
          type="text"
          className="form-control w-100"
          placeholder="1"
          name="room_id"
          value={room_id}
          onChange={(e) => setRId(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea2" class="form-label">
          Number
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder=""
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea3" class="form-label">
          Capacity
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder=""
          name="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea4" class="form-label">
          Building
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder=""
          name="Building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        />
      </div>
     
      <div class="row mb-3 align-self-center">
        <input
          type="submit"
          class="col btn btn-primary m-0 align-self-center"
          value="Submit"
          onClick={RoomInfo}
        />
      </div>
    </div>
  );
}

export default Room;