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

  //State of Products
  const [DisplayProducts, setDisplayProducts] = useState([]);

  const getProducts = async () =>{
    const DisplayProducts = await fs.collection('Products').get();
    const ProductsArray = [];
    for (var snap of DisplayProducts.docs){
      var data = snap.data();
      data.ID = snap.id;
      ProductsArray.push({
        ...data
      })
      if(ProductsArray.length === DisplayProducts.docs.length){
        setDisplayProducts(ProductsArray);
      }
    }
  }

  useEffect(()=>{
    getProducts();
  },[])


  return (
    <div>
        <Navbar user={user}/>
        <br></br>
        {DisplayProducts.length > 0 && (
          <div className='container-fluid'>
            <h1 className='text-center'>Products</h1>
            <div className='products-box'>
              <Products DisplayProducts = {DisplayProducts}/>
            </div>
          </div>
        )}
        {DisplayProducts.length < 1 && (
          <div className='container-fluid'>Please wait...</div>
        )}
    </div>
  )
}
