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
import Navbar from "./FacultyNavbar";
import { getCookie } from "../utils.js";
import "../styles/messages.css";
import jwtDecode from "jwt-decode";
const token = localStorage.getItem('jwtToken')
const user = jwtDecode(token)

function TeacherMessage() {
  const [feedbackList, setFeedbackList] = useState([]);

  let response = '';
  let response_replies = ''
  useEffect(()=>{
    fetchFeedback();
  })
  const fetchFeedback = async () => {
    console.log("called")
    const _response = await axios.post('http://localhost:8000/extract_feedback/',{
      'email' : user.user_mail
    })
    response = _response.data
    // console.log(response)
    // console.log(response.length)
    response_replies = response.map((item)=>{
      // console.log(item.id)
      // console.log(item.feedback_id)
      if(item.feedback_id !== undefined)
        // response_replies = response_replies + item
        return item;
    })
    console.log(response_replies)
}
  // useEffect(() => {
  //   const fetchFeedback = async () => {
  //     const studentCode = getCookie("student_code");
  //     const response = await axios.get(`http://localhost:8000/Teacherfeedback/?student=${studentCode}`);
  //     setFeedbackList(response.data);
  //   };
  //   fetchFeedback();
  // }, []);

  // const handleReply = async (e, feedbackId, replyText) => {
  //   e.preventDefault();
  //   const response = await axios.post(`http://localhost:8000/Teacherfeedback/${feedbackId}/reply/`, {
  //     reply: replyText,
  //   });
  //   setFeedbackList(
  //     feedbackList.map((feedback) =>
  //       feedback.id === feedbackId ? { ...feedback, reply: response.data.reply } : feedback
  //     )
  //   );
  // };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="text-center">Teacher Feedback</h3>

        {response.length === 0 && (
          <div className="no-feedback text-center">
            <p>No feedback to display</p>
          </div>
        )}

        {
          response.length > 0 && (
            <div className="feedback-container">

              {
                response.map((feedback,index) => {
                  console.log("called response");
                  <div className="response-item" key={index}>
                    <div className="feedback-topic">{feedback.topic}</div>
                    <div className="feedback-message">{feedback.comment}</div>

                    <div className="reply-container">

                    {
                        response_replies.map((item)=>{
                          console.log(item)
                          if(feedback.id===item.feedback_id){
                            <div className="reply-item">
                              <div className="reply-message">{item.comment}</div>
                            </div>
                          }
                        })
                    }

                    </div>
                  </div>
              })
              }

            </div>
          )
        }
        {/* {feedbackList.length > 0 && (
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
        )}  */}
      </div>
    </>
  );
}

export default TeacherMessage;

