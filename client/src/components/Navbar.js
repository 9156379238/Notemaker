import { NavDropdown, Nav,Dropdown } from 'react-bootstrap';
import { useHistory,Link } from "react-router-dom";
import '../App.css';


function Navbar() {
     const history = useHistory();    
    function logout() {
        localStorage.clear();
        history.push('/Signin')
    }
    return (
        <>
            <div>
                <div className="Navbar">
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        {/* <div className="container"> */}
                            <Link className="navbar-brand" to={"/"} style={{ color: "white", marginLeft: "8%", fontSize: "28px"}}>NoteBook</Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">
                                    {
                                        localStorage.getItem('loggedIn') ?
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to={"/"} style={{ color: "white"  }}>Home</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to={"/Contact"} style={{ color: "white" }}>Contact</Link>
                                                </li>
                                            </>
                                            :
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to={"/Signin"} style={{ color: "white"}}>Login</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to={"/Signup"} style={{ color: "white" }} >Register</Link>
                                                </li>
                                            </>
                                    }

                                </ul>
                            </div>
                            <div>
                            
                                {
                                localStorage.getItem('loggedIn') ?
                                <div className = "nav">
                                        <Nav >
                                            <NavDropdown title= {localStorage.getItem("email")}>
                                            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                </div>
                                    : null
                                    }
                            </div>
                        {/* </div> */}
                    </nav>

                </div>
            </div>
        </>
    )
}
export default Navbar;