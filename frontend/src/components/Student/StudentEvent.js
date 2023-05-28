import React, { useState, useEffect } from 'react';
import StudentEventCard from '../EventCard';
import Navbar from "../Student/StudentNavbar";
import "../../styles/StudentEventCard.css";

function StudentEvent() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestData = {
        dept_id: "DOCSE",
      };

      try {
        const response = await fetch('http://localhost:8000/dept_events/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(JSON.parse(responseData));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData_2 = async () => {
      const requestData = {
        dept_id: "DOCSE",
      };

      try {
        const response = await fetch('http://localhost:8000/ku_events/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setData2(JSON.parse(responseData));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchData_2();
  }, []);

  console.log(data)
  console.log(data2)


  return (
    <div>
      <div className='event-container'>
        <h1 className='display-1'>KU Events</h1>
        <div className='card-list-container'>
        {data2.map((item, index) => (
          <StudentEventCard 
            title={item.fields.heading}
            description={item.fields.description}
            start_date={item.fields.start_date}
            end_date={item.fields.end_date}
          />
        ))}
        </div>
        <hr />
        <h1 className='display-1'>Department Events</h1>
        <div className='card-list-container'>
        {data.map((item, index) => (
          <StudentEventCard 
            title={item.fields.heading}
            description={item.fields.description}
            start_date={item.fields.start_date}
            end_date={item.fields.end_date}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

export default StudentEvent;
