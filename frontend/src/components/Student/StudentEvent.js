import React, { useState, useEffect, useRef } from 'react';
import StudentEventCard from '../EventCard';
import Navbar from "../Student/StudentNavbar";
import "../../styles/StudentEventCard.css";
import styled from 'styled-components';

const EventContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const EventCard = styled.div`
  width: calc(50% - 24rem);
  height: 18rem;
  margin-bottom: 2rem;
  border-radius: 14px;
  padding: 1rem 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled.button`
  height: 2rem;
  border: none;
  border-radius: 6px;
  background-color: #0d6efd;
  color: #ffffff;
  align-self: flex-end;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;


function StudentEvent() {
  const [events, setEvents] = useState([]);
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

  useEffect(() => {
    const combinedEvents = [...data, ...data2];
    setEvents(combinedEvents)
  }, [data, data2])

  console.log(data)
  console.log(data2)


  return (
        <EventContainer>
        {events.map((item, index) => {
          return (
            <EventCard >
            <StudentEventCard 
              title={item.fields.heading}
              description={item.fields.description}
              start_date={item.fields.start_date}
              end_date={item.fields.end_date}
            />
            <Button>Read More</Button>
            </EventCard>
          );
        })}
        </EventContainer>
  );
}

export default StudentEvent;
