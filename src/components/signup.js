import React, {useState} from 'react'
import { Link } from 'react-router-dom'


export const SignUp = () => {

  const [Fullname, setFullname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');

  const [ErrorMsg, setErrorMsg] = useState('');
  const [SuccessMsg, setSuccessMsg] = useState('');

  const handleSignup=(e)=>{
    e.preventDefault();
    console.log(Fullname, Email, MobileNumber, Password, ConfirmPassword)
  }

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h1>SignUp</h1>
        <hr></hr>
        <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
            <label>Full Name</label>
            <input type='text' className='form-control' required onChange={(e)=>setFullname(e.target.value)} value={Fullname}/>
            <label>Email</label>
            <input type='email' className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={Email}/>
            <label>Age</label>
            <input type='number' className='form-control' required />
            <label>Mobile Number</label>
            <input type='number' className='form-control' required onChange={(e)=>setMobileNumber(e.target.value)} value={MobileNumber}/>
            <label>Password</label>
            <input type='password' className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={Password}/>
            <label>Re Enter Password</label>
            <input type='password' className='form-control' required onChange={(e)=>setConfirmPassword(e.target.value)} value={ConfirmPassword}/>
            <br></br>
            <div className='btn-box'>
                <span>Already have an account <Link to = '/login' className = 'link' >Click Here</Link></span>
                <button type='submit' className='btn btn-success btn-md'>Sign Up</button>
            </div>
        </form>
        <br></br>
        <Link to = '/' className = 'link'>Skip Signup</Link>
        
    </div>
  )
}
