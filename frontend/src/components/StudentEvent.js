import React, { useState, useEffect } from 'react';
import MyCalendar from "./Calendar";
import StudentEventCard from "./EventCard";

function StudentEvent(){

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //   async function fetchData() {
    //     const response = await fetch('/api/my-data/');
    //     const data = await response.json();
    //     setData(data);
    //   }
    //   fetchData();
    // }, []);

    return(
        <div>
            <MyCalendar/>
            <StudentEventCard 
            title="My Event"
            description="This is my event description"
            location="New York"
            date="March 17, 2023"
            time="2:00 PM"
            image="https://lh3.googleusercontent.com/p/AF1QipPOntyKJE_SNLRn5Z_Apy9ghlFgUi8h8OqJXSYZ=s680-w680-h510"
            link="https://example.com"
            />

        </div>
    );
}

export default StudentEvent;

