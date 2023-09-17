import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const LogIn = () => {


  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin=(e)=>{
    e.preventDefault();
    console.log(Email, Password)
  }

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h1>Sign In</h1>
        <hr></hr>
        <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
            <label>Email ID</label>
            <input type = 'email' className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={Email}/>
            <br></br>
            <label>Password</label>
            <input type='password' className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={Password}/>
            <br></br>

            <div className='btn-box'>
                <span>Dont Have an account<Link to = '/signup' className = 'link' > SignUp</Link></span>
                <button type = 'submit' className='btn btn-success btn-md'>Sign In</button>
            </div>

        </form>
    </div>
  )
}
