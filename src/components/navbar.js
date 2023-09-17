import React from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        <Link to = 'Signup'>SignUp</Link> 
        <Link to = 'Login'>Login</Link>        
    </div>
  )
}
