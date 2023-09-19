import React, { useState, useEffect } from 'react'
import { Navbar } from './navbar'
import { Products } from './products'
import { auth, fs } from '../Config/config'
import { HappyTears } from './happyTears'

export const Home = (props) => {
  //getting current user uid
  function GetUserUid(){
    const [uid, setUid] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          setUid(user.uid);
        }
      })
    },[])
    return uid;
  }

  const uid = GetUserUid();


  //current user information fuction
  function GetCurrentUser(){
    const [user, setUser] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if (user) {
          fs.collection('users').doc(user.uid).get().then(snapshot=>{
            setUser(snapshot.data().Fullname)
          })
        }else{
          setUser(null);
        }
      })

    }, [])
    return user;
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

  //state of total products in cart that will be displayed in the cart button on the navbar
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart '+user.uid).onSnapshot(snapshot=>{
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        })
      }
    })
  },[])

  let DisplayProd;

  const addToCart = (DisplayProducts) =>{
    if(uid!==null){
      //console.log(DisplayProducts);
      DisplayProd = DisplayProducts
      DisplayProd['qty'] = 1;
      DisplayProd['TotalProductPrice'] = DisplayProd.qty*DisplayProd.Price;
      fs.collection('Cart ' + uid).doc(DisplayProducts.ID).set(DisplayProd).then(()=>{
        console.log('Successfully added to cart')
      })
    }else{
      props.history.push('/login')
    }
  }


  return (
    <div>
        <Navbar user={user} totalProducts={totalProducts}/>
        <br></br>
        <HappyTears />
        {DisplayProducts.length > 0 && (
          <div className='container-fluid'>
            <h1 className='text-center'>Products</h1>
            <div className='products-box'>
              <Products DisplayProducts = {DisplayProducts} addToCart = {addToCart}/>
            </div>
          </div>
        )}
        {DisplayProducts.length < 1 && (
          <div className='container-fluid'>Please wait...</div>
        )}
    </div>
  )
}
