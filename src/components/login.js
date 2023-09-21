import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../Config/config'

export const LogIn = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [SuccessMsg, setSuccessMessage] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const handleLogin=(e)=>{
    e.preventDefault();
    //console.log(Email, Password)
    auth.signInWithEmailAndPassword(email, password).then(()=>{
      setSuccessMessage('Login Successful, welcome to the world of Surprises')
      setEmail('');
      setPassword('');
      setErrorMessage('');
      setTimeout(()=>{
        setSuccessMessage('');
        history.push('/home')
      },2000)
    }).catch(error=>setErrorMessage(error.message));
  }

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h1>Sign In</h1>
        <hr></hr>

        {SuccessMsg&&<>
          <div className='success-msg'>{SuccessMsg}</div>        
        </>}

        <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
            <label>Email ID</label>
            <input type = 'email' className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <br></br>
            <label>Password</label>
            <input type='password' className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <br></br>

            <div className='btn-box'>
                <span>Dont Have an account<Link to = '/signup' className = 'link' > SignUp</Link></span>
                <button type = 'submit' className='btn btn-success btn-md'>Sign In</button>
            </div>
        </form>
        {ErrorMessage&&<>
          <div className='error-msg'>{ErrorMessage}</div>
        </>}
    </div>
  )
}
