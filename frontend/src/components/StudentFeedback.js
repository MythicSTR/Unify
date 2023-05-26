import {useState } from "react";
import StudentNavbar from "./StudentNavbar";
import jwt_decode from 'jwt-decode';

const jwt_token = localStorage.getItem('jwtToken');
const token = jwt_decode(jwt_token);
console.log(token);
  
function StudentFeedback() {

  const topic = ["Lecture", "Grade", "Assignment", "Attendence"];
  const school = [
    "School of Engineering",
    "School of Science",
  ];
  const department = {

    "School of Engineering": [
      "DOCHE",
      "DOCIE",
      "DOCSE",
      "DOEEE",
      "DOGEE",
      "DOMEE",
    ],

    "School of Science": [
      "DOBiT",
      "DOESE",
      "DOLSc",
      "DOMAT",
      "DOPHM",
      "DOPHY",
    ],
  };
  const [selectedschool, setSelectedschool] = useState("School of Engineering");
  const [selectedtopic, setSelectedtopic] = useState("Lecture");
  const [selecteddepartment, setselecteddepartment] = useState("DOCHE");
  const [comment,setComment] = useState("");
  const [email,setEmail] = useState("");

  const FeedbackInfo = async () => {

    if(comment === ""){
      window.alert("Please provide comment.")
      return;
    }

    try{
      const response = await fetch('http://localhost:8000/feedback/',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          topic : selectedtopic,
          comment : comment,
          dept_id : selecteddepartment,
          school : selectedschool,
          student_id : token.user_id,
          email : email

        })
      });
      const get_response = await response.json();
      if(get_response.message==='Sucessfull'){
        window.alert("Feedback sucessfully submitted. Thank you for your feedback.");
        setEmail('');
        setComment('');
        setSelectedschool('School of Engineering');
        setselecteddepartment('DOCHE');
        setSelectedtopic('Lecture')
      }
      else if(get_response==="Error"){
        window.alert("Server error. Please try again later.")
      }
      else{
        window.alert("Please try again later.")
      }
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div>
    <StudentNavbar />
    <div className="border w-25 p-4 position-absolute top-50 start-50 translate-middle" style={{ marginTop: '7rem' }}>

    <div class="form-group">
    <label for="exampleFormControlTextarea1" class="form-label">
      Email
    </label>
    <div className="email">
      <input
        name="email"
        rows="7"
        placeholder=""
        required
        class="form-control w-100"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
    </div>
  </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          School
        </label>
        <select
          class="form-control w-100"
          value={selectedschool}
          onChange={(e) => {
            setSelectedschool(e.target.value);
          }}
        >
          {school.map((school) => {
            return <option>{school}</option>;
          })}
        </select>
        <label
          for="exampleFormControlTextarea1"
          class="form-label"
          placeholder="Department"
        >
          Department
        </label>
        {selectedschool && (
          <select class="form-control w-100" value={selecteddepartment} onChange={(e) => {
            setselecteddepartment(e.target.value);
          }}>
            {department[selectedschool].map((department) => {
              return <option>{department}</option>;
            })}
            {selectedschool=="School of Science" && selecteddepartment=="DOCHE"?(setselecteddepartment("DOBiT")):(selecteddepartment)}
          </select>
        )}
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          Topic
        </label>
        <select
          class="form-control w-100"
          value={selectedtopic}
          onChange={(e) => {
            setSelectedtopic(e.target.value);
          }}
        >
          {/* {
            selectedtopic==""?(setSelectedtopic("Lecture")):(selectedtopic)
          } */}
          {topic.map((topic) => {
            return <option>{topic}</option>;
          })}
        </select>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          Feedback
        </label>
        <div className="comment">
          <textarea
            name="message"
            rows="7"
            placeholder=""
            required
            class="form-control w-300"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div class="row mb-3 align-self-center">
        <input
          type="submit"
          class="col btn btn-primary m-0 align-self-center"
          value="Submit"
          onClick={FeedbackInfo}
        />
      </div>
    </div>
    </div>
  );
}

export default StudentFeedback;
