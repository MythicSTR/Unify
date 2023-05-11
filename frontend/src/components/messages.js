// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./StudentNavbar";
// import { getCookie } from "../utils.js";
// import"../styles/messages.css"

// function StudentMessage() {
//   const [feedbackList, setFeedbackList] = useState([]);

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       const studentCode = getCookie("student_code"); 
//       const response = await axios.get(`http://localhost:8000/Teacherfeedback/?student=${studentCode}`);
//       setFeedbackList(response.data);
//     }
//     fetchFeedback();
//   }, []);

//   return (
//     <div>
//       <Navbar />

//       <div className="container mt-5">
//         <h3>Teacher Feedback</h3>
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">Topic</th>
//               <th scope="col">Comment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feedbackList.map((feedback) => (
//               <tr key={feedback.id}>
//                 <td>{feedback.topic}</td>
//                 <td>{feedback.comment}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default StudentMessage;


import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./StudentNavbar";
import { getCookie } from "../utils.js";
import "../styles/messages.css";

function StudentMessage() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const studentCode = getCookie("student_code");
      const response = await axios.get(`http://localhost:8000/Teacherfeedback/?student=${studentCode}`);
      setFeedbackList(response.data);
    };
    fetchFeedback();
  }, []);

  const handleReply = async (e, feedbackId, replyText) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:8000/Teacherfeedback/${feedbackId}/reply/`, {
      reply: replyText,
    });
    setFeedbackList(
      feedbackList.map((feedback) =>
        feedback.id === feedbackId ? { ...feedback, reply: response.data.reply } : feedback
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="text-center">Teacher Feedback</h3>

        {feedbackList.length === 0 && (
          <div className="no-feedback text-center">
            <p>No feedback to display</p>
          </div>
        )}

        {feedbackList.length > 0 && (
          <div className="feedback-container">
            {feedbackList.map((feedback, index) => (
              <div className="feedback-item" key={index}>
                <div className="feedback-topic">{feedback.topic}</div>
                <div className="feedback-message">{feedback.comment}</div>

                <div className="reply-container">
                  {feedback.reply && (
                    <div className="reply-item">
                      <div className="reply-message">{feedback.reply}</div>
                    </div>
                  )}

                  {!feedback.reply && (
                    <form onSubmit={(e) => handleReply(e, feedback.id, e.target.replyText.value)}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Write a reply"
                          name="replyText"
                        />
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Reply
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default StudentMessage;

