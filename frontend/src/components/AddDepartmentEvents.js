import React, { useState } from 'react';
import '../styles/AddEvents.css';



function AddDepartmentEvents() {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    // Handle form submission logic here
    event.preventDefault();
    const formattedStartDate = new Date(startDate).toISOString().slice(0, 10);
    const formattedEndDate = new Date(endDate).toISOString().slice(0, 10);
    
      
        const data = {
          title: title,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          description: description,
          dept_id : "DOCSE",  
        };
      
        fetch('http://localhost:8000/add_dept_events/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            console.log(data);
            console.log(response);
            // Handle successful form submission
          } else {
            // Handle form submission error
          }
        })
        .catch(error => {
          // Handle network error
        });

      



  }

  return (
    <form onSubmit={handleSubmit} className="add-event-form">
      <h2>Add Event</h2>
      <div className="form-group">
        <label htmlFor="title">Topic:</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={title} 
          onChange={(event) => setTitle(event.target.value)} 
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input 
          type="date" 
          id="startDate" 
          name="startDate" 
          value={startDate} 
          onChange={(event) => setStartDate(event.target.value)} 
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <input 
          type="date" 
          id="endDate" 
          name="endDate" 
          value={endDate} 
          onChange={(event) => setEndDate(event.target.value)} 
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea 
          id="description" 
          name="description" 
          value={description} 
          onChange={(event) => setDescription(event.target.value)} 
          required
        />
      </div>

      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddDepartmentEvents;
