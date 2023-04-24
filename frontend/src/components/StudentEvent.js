import React, { useState, useEffect } from 'react';
import StudentEventCard from './EventCard';

function StudentEvent() {
  const [data, setData] = useState([]);

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
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      {Array.isArray(data) && data.map(data => (
        <StudentEventCard
          
          heading={data.heading}
          description={data.description}
          start_date={data.start_date}
          end_date={data.end_date}
        />
      ))}
    </div>
  );
}

export default StudentEvent;
