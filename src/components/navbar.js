import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../assets/logo-circle.png'
import { Icon } from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather'
import { auth } from '../Config/config'
import '../styles/navbar.css'

export const Navbar = ({ user, totalProducts }) => {

  const history = useHistory();

  const handleLogout=()=>{
    auth.signOut().then(()=>{
        history.push('/Login');
    })
  }

  const [navbar, setNavbar] = useState(false);

  const changeBackground = () =>{
    console.log(window.scrollY);
    if (window.scrollY >= 95){
      setNavbar(true);
    }else{
      setNavbar(false);
    }
  }

  window.addEventListener('scroll', changeBackground);


  return (
    <div className={navbar ? 'navbar active' : 'navbar'}>
        <div className='leftside'>
            <div className='logo'>
                <Link className='navlink' to = '/'><img src={logo} alt='' /></Link>
            </div>
        </div>
        <div className='rightside'>
            {!user&&<>
                <div><Link to = 'Signup'>SignUp</Link></div>
                <div><Link to = 'Login'>Login</Link></div>
            </>}
            {user&&<>
                <div className='navlink' >{user}</div>
                <div className='cart-menu-btn'>
                    <Link className='navlink' to='/cart'>
                        <Icon icon = {shoppingCart} size = {20} />
                    </Link>
                    {<span className='cart-indicator'>{totalProducts}</span>}
                </div>
                <div className='btn btn-danger btn-md' onClick={handleLogout}>LOGOUT</div>
            </>}
        </div>       
    </div>
  )
}
