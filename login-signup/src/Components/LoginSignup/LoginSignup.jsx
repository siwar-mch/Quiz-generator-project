import React, {useState} from 'react';
import './LoginSignup.css'


const LoginSignup = () =>{
    const [action,setAction] = useState("Sign Up");
    return (
        <div className='Container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="input-fields">
                {action === "Login"?<div></div>:
                    <div class="input-field">
                        <input type="text" required/> 
                        <label>Enter Your First Name</label>
                    </div> 
                }
                {action === "Login"?<div></div>:
                    <div class="input-field">
                        <input type="text" required/> 
                        <label>Enter Your Last Name</label>
                    </div> 
                }
                <div class="input-field">
                    <input type="email" required/>
                    <label>Enter Your Email</label>
                </div>
                <div class="input-field">
                    <input type="password" required/> 
                    <label>Enter Your Password</label>
                </div> 
            </div>
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}> Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
            
            
        </div>



/*<div class="wrapper">
        
        
<div class="register">
                <p>Don't have an account ?</p>
                <a href="sign-up.html">Register Now</a>
            </div>
        </form>
    </div>*/
    )
}
 
export default LoginSignup