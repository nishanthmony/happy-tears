import React, { useState, useEffect } from 'react'
import { Navbar } from './navbar'
import { Products } from './products'
import { auth, fs } from '../Config/config'

export const Home = () => {
  //current user information fuction
  function GetCurrentUser(){
    const [User, setUser] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(User=>{
        if (User) {
          fs.collection('users').doc(User.uid).get().then(snapshot=>{
            setUser(snapshot.data().Fullname)
          })
        }else{
          setUser(null);
        }
      })

    }, [])
    return User;
  }

  const user = GetCurrentUser();
  //console.log(user)

  return (
    <div>
        <Navbar user={user}/>
        <Products />
    </div>
  )
}
