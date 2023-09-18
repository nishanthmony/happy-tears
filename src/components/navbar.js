import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../assets/logo-circle.png'
import { Icon } from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather'
import { auth } from '../Config/config'

export const Navbar = ({ user, totalProducts }) => {

  //window.onscroll = function() {scrollFunction()};

  // eslint-disable-next-line
  function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById("navbar").style.padding = "30px 10px";
      document.getElementById("logo").style.fontSize = "25px";
    } else {
      document.getElementById("navbar").style.padding = "80px 10px";
      document.getElementById("logo").style.fontSize = "35px";
    }
  }

  const history = useHistory();

  const handleLogout=()=>{
    auth.signOut().then(()=>{
        history.push('/Login');
    })
  }


  return (
    <div className='navbar'>
        <div className='leftside'>
            <div className='logo'>
                <img src={logo} alt=''/>
            </div>
        </div>
        <div className='rightside'>
            {!user&&<>
                <div><Link to = 'Signup'>SignUp</Link></div>
                <div><Link to = 'Login'>Login</Link></div>
            </>}
            {user&&<>
                <div className='navlink' ><Link className='navlink' to = '/'>{user}</Link></div>
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
