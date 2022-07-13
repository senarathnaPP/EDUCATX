import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './adminNavbar.css';
import logo from "../../Images/logo1.png"

function AdminNavbar() {
    const [click,setClick]=useState(false);
    const [button, setButton] = useState(true)
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false)

    const showButton = () =>{
        if(window.innerWidth<= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    };
useEffect(() =>{
    showButton();
}, []);


const [logStatus, setLoginStatus] = useState(false);
    const [loguser, setLogUser] = useState("");


    useEffect(() => {
        console.log("sessionStorage.getItem('LogStatus')",
            sessionStorage.getItem('LogStatus'));

        const logStatus = sessionStorage.getItem('LogStatus') === 'true' ? true : false
        const logUser = sessionStorage.getItem('Loguser')
        console.log("zzz", logStatus)
        setLoginStatus(logStatus)
        setLogUser(logUser)




    });
    window.addEventListener('resize', showButton);
    return (
        <>
         <nav className="navbar">
         <div className='navbar-container'>
            
         <Link to="/home" className="navbar-logo" onClick = {closeMobileMenu}>
            <img  style={{width:60}} class="" src={logo} alt=""/>  ADMIN PANEL</Link>

            
              
            <div className = 'menu-icon' onClick= {handleClick}> 
            </div>

            <ul className ={click ? 'nav-menu active' : 'nav-menu'}>
{/* 
             
            <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Notifications
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                My profile
                </Link>
            </li> */}

            {/* {logStatus ?
                                <><li className='nav-item'><p  className='nav-links' style={{ "color": "#0d6efd" }}>{loguser}</p></li>
                                </>
                               :
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>

                            } */}

 
            </ul>
            {button &&  <a href='/login'><Button buttonStyle = 'btn--outline'> LOG OUT</Button> </a>}
             </div>
            
             </nav>   
        </>
    );
}

export default AdminNavbar;