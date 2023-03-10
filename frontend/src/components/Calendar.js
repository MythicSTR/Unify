import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../styles/Calendar.css"
function MyCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    function handleDateChange(date) {
      setSelectedDate(date);
    }
  
    return (
      <div>
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
      </div>
    );
  }
  

export default MyCalendar;