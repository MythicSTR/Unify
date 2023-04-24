import {Link, useLocation} from 'react-router-dom';
import Header from "../components/Header";

function Navbar() {
    const location = useLocation();
    console.log(location);
    return (
      <div>
      <Header />
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 mt-3 d-md-block bg-light sidebar collapse">
        <div class="position-sticky">
            <ul class="nav flex-column">
            <li class="nav-item">
                <Link to="/student" class={location.pathname === '/student' ? 'nav-link active' : 'nav-link'} aria-current="page">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                Dashboard
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/student/routine" class={location.pathname === '/student/routine' ? 'nav-link active' : 'nav-link'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file" aria-hidden="true"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                Routine
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/student/attendance" class={location.pathname === '/student/attendance' ? 'nav-link active' : 'nav-link'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Attendance
                </Link>
            </li>

            <li class="nav-item">
            <Link to="/student/events" class={location.pathname === '/student/events' ? 'nav-link active' : 'nav-link'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Events
            </Link>
        </li>

            <li class="nav-item">
                <Link to="/student/classroom" class={location.pathname === '/student/classroom' ? 'nav-link active' : 'nav-link'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Classroom
                </Link>
            </li>
            
            <li class="nav-item">
                <Link to="/student/messages" class={location.pathname === '/student/messages' ? 'nav-link active' : 'nav-link'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                Messages
                </Link>
            </li>
            </ul>
        </div>
        </nav>
        </div>
    );
}

export default Navbar;