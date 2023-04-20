
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from "../utils.js";

function Feedback() {
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/teacher/feedback/', {
          headers: { "X-CSRFToken": getCookie("csrftoken") },
        }); 
        setFeedbackMessage(response.data.message);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFeedback();
  }, []);

  return (
    <div>
      <p>{feedbackMessage}</p>
    </div>
  );
}

export default Feedback;