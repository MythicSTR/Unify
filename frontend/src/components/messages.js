import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./StudentNavbar";
import { getCookie } from "../utils.js";
import"../styles/messages.css"

function StudentMessage() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const studentCode = getCookie("student_code"); 
      const response = await axios.get(`http://localhost:8000/Teacherfeedback/?student=${studentCode}`);
      setFeedbackList(response.data);
    }
    fetchFeedback();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h3>Teacher Feedback</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.topic}</td>
                <td>{feedback.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentMessage;
