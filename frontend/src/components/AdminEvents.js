import React from "react";
import Navbar from "./AdminNavbar";
import MyCalendar from "./Calendar";
import AddKuEvents from "./AddKuEvents";
function AdminEvent(){
    return(
        <div>
            <Navbar/>
            <AddKuEvents />
            <MyCalendar/>
        </div>
    );
}

export default AdminEvent;

