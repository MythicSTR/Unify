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


import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../Faculty/FacultyNavbar";
import { getCookie } from "../../utils.js";
import "../../styles/messages.css";
import jwtDecode from "jwt-decode";
const token = localStorage.getItem('jwtToken')
const user = jwtDecode(token)

function TeacherMessage() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [responseReplies, setResponseReplies] = useState([]);
  
  const [replyContent, setReplyContent] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(()=>{
    fetchFeedback();
  })

  const fetchFeedback = async () => {
    const _response = await axios.post('http://localhost:8000/extract_feedback/',{
      'email' : user.user_mail
    })
    setMessages(_response.data)

    setFeedback(messages.filter(item => !item.hasOwnProperty('feedback_id')));

    setResponseReplies(messages.filter(item => item.hasOwnProperty('feedback_id')));

    console.log(_response)
  }

  const handleReplyButtonClick = (threadId) => {
    setShowReplyBox(!showReplyBox)
    setSelectedThread(threadId);
  }

  const handleReplyContentChange = (event) => {
    setReplyContent(event.target.value)
  }

  const handlePostReplyClick = async (id) => {
    setReplyContent(replyContent);
    
    const feedData = {
      id: id,
      comment: replyContent
    }

    try {
      const response = await fetch('http://localhost:8000/add_reply/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedData)
      });
    } catch (error) {
      console.log("Error sending data: ", error);
    }
  }


  return (
    <>
      <div className="messages-container">
        <h1>Feedback</h1>
        <hr />
        <div className="feedback-container">
          {feedback.map((feed, index) => {
            const replies = responseReplies.filter(reply => feed.id === reply.feedback_id)

            return (
              <div>
                <div className="feedback-card">
                  <div className="feedback-title">{feed.student}</div>
                  <div className="feedback-message">{feed.comment}</div>
                  <button className="reply-button" onClick={() => handleReplyButtonClick(index)}>Reply</button>
                  {showReplyBox && selectedThread === index && (<div className="reply-box">
                    <textarea
                      className="reply=textarea"
                      value={replyContent}
                      onChange={handleReplyContentChange} 
                      >
                    </textarea>
                    <button 
                      className="post-reply-button"
                      onClick={() => handlePostReplyClick(feed.id)}
                    >
                      Post
                    </button>
                  </div>
                  )}
                </div>
                {replies.map((reply, index) => (
                  <div className="reply-card">
                    <div className="reply-title">{reply.student}</div>
                    <div className="reply-message">{reply.comment}</div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default TeacherMessage;

