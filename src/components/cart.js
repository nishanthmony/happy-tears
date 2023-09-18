import React, { useState, useEffect } from 'react'
import {Navbar} from './navbar'
import { auth, fs } from '../Config/config'
import { CartProducts } from './cartProducts';

export const Cart = () => {

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

  //state of cart items for corresponding users
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
          const newCartProduct = snapshot.docs.map((doc)=>({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        })

      }else{
        console.log('User is not Signed In to fetch Cart Items');
      }
    })
  }, [])

  //console.log(cartProducts)

  return (
    <>
      <Navbar user={user}/>
      <br></br>
      {cartProducts.length > 1 && (
        <div className='container-fluid'>
          <h1 className='text-center'>My Cart</h1>
          <div className='products-box'>
            <CartProducts cartProducts={cartProducts}/>
          </div>
        </div>
      )}
      {cartProducts.length <1 && (
        <div className='container-fluid'>No Products to show</div>
      )}
    </>
  )
}
