import React from 'react'
import './signup.css'
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

   const { loading, signup} = useSignup();

   // Handling the form submission
const registerUser = async (e) => {
e.preventDefault();
await signup(data);
};





return (
<div className="flex-container">
    
    <div className='content-container'>
        
        <div className='form-container'>
            <form onSubmit={registerUser}>
                <h1>
                    Sign Up
                </h1>
                <br />
                <br />
                <span className='subtitle'>USERNAME</span>
                <br/>
                 <input onChange={(e) => setData({...data, username: e.target.value})}  type = 'text' name= 'username' value={data.name} className='data-input'></input>
                <br></br>
                
                <span className = "subtitle">PASSWORD</span>
                <br />
                <input onChange={(e) => setData({...data, password: e.target.value})}  className="data-input"
                 value={data.password} type="password" /> 
                 
                 <br />
                 <span className = "subtitle"> CONFIRM PASSWORD:</span>
                <br />
                <input onChange={(e) => setData({...data, confirmPassword: e.target.value})}  className="data-input"
                 value={data.confirmPassword} type="password" />
                <br />   
                <Link to = '/login'>
                <p className="no-account">Already have an account?</p>  
                </Link> 
                <input type="submit" value = {loading ? '...' : "Sign Up"} className='btn bg-orange-600 text-white'  disabled={loading} /> 
                

            </form>
        </div>
    </div>
<div>
</div>

</div>
);
}

export default Signup