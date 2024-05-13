import React from 'react'
import './login.css'
import { useState } from 'react';
import useLogin from '../../hooks/useLogin';
import { Link } from 'react-router-dom';



export default function Login() {

     
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
   
    const{loading, login} = useLogin()


    const handleLogin =  async (event) => {
        event.preventDefault();
        await login(username, password);
       
    }

return (
<div className="flex-container">
    
    <div className='content-container'>
        
        <div className='form-container'>
        
        <form onSubmit={handleLogin}>
                <h1>
                    Log in
                </h1>
                <br />
                <br />
                <span className='subtitle'>USERNAME</span>
                <br/>
                <input  type = 'text' name= 'username' value={username} onChange={(e) => setUserName(e.target.value)} className='data-input'></input>
                <br></br>
                 <span className = "subtitle">PASSWORD:</span>
                <br />
                <input  className="data-input"
                 value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                <br />   
                 <Link to = '/signup'>
                <p className="no-account">Don't have an account ?</p>
                 </Link>
                 <input type="submit" value = {loading ? '...' : "Log In"} className='btn bg-orange-600 text-white'  disabled={loading} /> 

            </form>
        </div>
    </div>
<div>
</div>

</div>
);
}