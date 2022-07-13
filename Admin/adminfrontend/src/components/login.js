import React, { useState ,useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import  "./login.css"
import logo from "../Images/logo11.png"

const Login = () =>{
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8000/api/admin/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();
        if (res.status === 400 || !data) {
            window.alert("Invalid credentials")
            window.alert("Login unsuccessful!")
        } else {

            console.log(data)
            window.alert("Login successful!")
            history.push("/home")
            document.location.reload()
            sessionStorage.setItem('LogStatus', true);
            sessionStorage.setItem('Loguser', data.data.name);
            sessionStorage.setItem('LogEmail', data.data.email);


        }
}

useEffect(() => {
    sessionStorage.setItem('LogStatus', false);
});

return (
    <>
        <div className="container">
            <div className="card"
                style={{
            // backgroundImage: `url(${logo})`,
            backgroundColor: "teal",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: "#fff",
          }}>
        
                <div>
                        <br/>
                        <h1 className='h1'>Login To Your Account</h1>
                    </div>
                    <div className="cardE"
                            style={{
                        backgroundImage: `url(${logo})`,
                        // backgroundColor: "black",
                        backgroundAttachment: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "300px 100px",
                        color: "#fff",
                    }}>
                    </div>
                    <br></br>   
                    <div>
                        <form method="POST" action="/home" autoComplete="off" className='login-wrapper'>
                            {/* <div class="flex flex-col mb-2">*/}
                                <div class="input" style={{marginLeft:'250px'}}> 

                                    <label style={{ color: "Black", fontSize: "20px",fontWeight:"bolder" }}>Email</label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                    <input type="text" id="sign-in-email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" 
                                    className="input" required
                                    style={{backgroundColor:'rgba(124, 124, 124, 0.5)',borderRadius:'none',border:'none',color:'white',padding:'5px'}}

                                    />
                                {/* </div>
                            </div> */}
                            {/* <div class="flex flex-col mb-6">
                                <div class="flex relative "> */}
                                <br/><br/>
                                    <label style={{ color: "Black", fontSize: "20px", fontWeight:"bolder" }}>Password</label>
                                    &nbsp; 
                                    <input type="password" id="sign-in-email" name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Your password" className="input" required
                                    style={{backgroundColor:'rgba(124, 124, 124, 0.5)',borderRadius:'none',border:'none',color:'white',padding:'5px'}}

                                    />
                                {/* </div>*/}
                            </div> 
                            <br />
                            <div className="login-btn">
                                <button className="greenBtn" type="submit" onClick={loginUser} >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <br />
                   
                </div>
            </div>
  
    </>
)
}



export default Login;