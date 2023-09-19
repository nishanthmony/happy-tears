import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, fs } from '../Config/config'


export const SignUp = () => {

  const history = useHistory();

  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');



  const [ErrorMsg, setErrorMsg] = useState('');
  const [SuccessMsg, setSuccessMsg] = useState('');

  const handleSignup=(e)=>{
    e.preventDefault();
    //console.log(Fullname, Email, MobileNumber, Password, ConfirmPassword)
    auth.createUserWithEmailAndPassword(email, password).then((credentials)=>{
        console.log(credentials);
        fs.collection('users').doc(credentials.user.uid).set({
            Fullname: fullName,
            Email: email,
            Password: password,
            MobileNumber: MobileNumber
        }).then(()=>{
            setSuccessMsg('Successfully logged in, now redirecting you to Login')
            setFullname('');
            setEmail('');
            setPassword('');
            setMobileNumber('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                history.push('/login');
            },3000)
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }).catch((error)=>{
        setErrorMsg(error.message)
    })
  }

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h1>SignUp</h1>
        <hr></hr>
        
        {SuccessMsg&&<>
            <div className='success-msg'>{SuccessMsg}</div>
            <br></br>
        </>}

        <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
            <label>Full Name</label>
            <input type='text' className='form-control' required onChange={(e)=>setFullname(e.target.value)} value={fullName}/>
            <label>Email</label>
            <input type='email' className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <label>Age</label>
            <input type='number' className='form-control' required />
            <label>Mobile Number</label>
            <input type='number' className='form-control' required onChange={(e)=>setMobileNumber(e.target.value)} value={MobileNumber}/>
            <label>Password</label>
            <input type='password' className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
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
        {ErrorMsg&&<>
            <div className='error-msg'>{ErrorMsg}</div>
            <br></br>
        </>}
        
    </div>
  )
}
