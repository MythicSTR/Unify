import jwtDecode from "jwt-decode";

function Header() {

    const handleLogOut = async () => {
        const response = window.confirm('Do you want to sign out ?');
        const token = localStorage.getItem('jwtToken');
        const user = jwtDecode(token);
        if(response){
            try{
                const response = await fetch('http://localhost:8000/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    user_mail:user.user_mail,
                    dept_id:user.dept_id,
                    user_id:user.user_id,
                    isStudent:user.isStudent,
                    isFaculty:user.isFaculty,
                    isAdmin:user.isAdmin,
                })
              })
              const data = await response.json();
              localStorage.removeItem('jwtToken');
              localStorage.setItem('jwtToken',data.token);
              window.location.href = '/login';
            }catch(error){
                console.log(error)
            }
            }
        }

    return (
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-4" href="#">Unify</a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-nav">
                <div class="nav-item text-nowrap">
                    <a class="nav-link px-3" href="#" onClick={handleLogOut}>Sign out</a>
                </div>
            </div>
        </header>
    );
}

export default Header;