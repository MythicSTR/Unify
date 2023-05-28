import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import "../../styles/messages.css";
import Navbar from "../Student/StudentNavbar";

const token = localStorage.getItem('jwtToken')
const user = jwtDecode(token)
  
const StudentMessages = () => {
    const [messages, setMessages] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [replies, setReplies] = useState([]);

    const fetchMessages = async() => {
        const _response = await axios.post('http://localhost:8000/extract_sfeedback/',{
        'user_id' : user.user_id
        })
        setMessages(_response.data)

        setFeedback(messages.filter(item => !item.hasOwnProperty('feedback_id')));

        setReplies(messages.filter(item => item.hasOwnProperty('feedback_id')));

    }

    useEffect(() => {
        fetchMessages();
    })
    
    return(
        <div>
            <Navbar />
            <div className="messages-container">
                <h1>Messages</h1>
                <hr />
                <div className="feedback-container">
                    {feedback.map((feed, index) => {
                        const corrReplies = replies.filter(reply => feed.id === reply.feedback_id)

                        return (
                            <div>
                                <div className="feedback-card">
                                    <div className="feedback-title">To {feed.email}</div>
                                    <div className="feedback-message">{feed.comment}</div>
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
        </div>
    );
}

export default StudentMessages;
