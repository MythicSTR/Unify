import React from "react";
import Navbar from "../Admin/AdminNavbar";
import MyCalendar from "../Calendar";
import AddKuEvents from "../Admin/AddKuEvents";
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

