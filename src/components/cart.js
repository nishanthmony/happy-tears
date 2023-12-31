import React, { useState, useEffect } from 'react'
import {Navbar} from './navbar'
import { auth, fs } from '../Config/config'
import { CartProducts } from './cartProducts';
import StripeCheckout from 'react-stripe-checkout'
import {Link} from 'react-router-dom'
import { Modal } from './modal';

export const Cart = () => {

  //show modal state
  const [showModal, setShowModal] = useState(false);

  const triggerModal= () =>{
    setShowModal(true);
  }

  //hide modal
  const hideModal=()=>{
    setShowModal(false);
  }


  //current user information fuction
  function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().Fullname);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
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

  //getting the value of qty for each products
  const qty = cartProducts.map(cartProduct=>{
    return cartProduct.qty;
  })
  //sum the total quantity
  const reduceOfQty = (accumulator, currentValue)=>accumulator+currentValue;
  const totalQty = qty.reduce(reduceOfQty, 0);
  //console.log(totalQty)

  const amt = cartProducts.map(cartProduct=>{
    return cartProduct.TotalProductPrice;
  })
  //sum of total amount
  const reduceOfAmount = (accumulator, currentValue) => accumulator+currentValue;
  const totalAmt = amt.reduce(reduceOfAmount, 0);
  console.log(totalAmt)


  //global variable
  let Product;

  //cart product increase function
  const cartProductIncrease=(cartProduct)=>{
    //console.log(cartProduct);
    Product = cartProduct;
    Product.qty = Product.qty+1;
    Product.TotalProductPrice = Product.qty*Product.Price
    //Updating in Database
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart '+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
          console.log('Increment Added');
        })
      }else{
        console.log('User is not Logged In');
      }
    })
  }

  const cartProductDecrease=(cartProduct)=>{
    //console.log(cartProduct);
    Product = cartProduct;
    if(Product.qty > 1){
      Product.qty = Product.qty-1;
      Product.TotalProductPrice = Product.qty*Product.Price
      //Updating in Database
      auth.onAuthStateChanged(user=>{
        if(user){
          fs.collection('Cart '+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
            console.log('Decrement Success');
          })
        }else{
          console.log('User is not Logged In');
        }
      })
    }
  }

  //payments in stripe
  const handleToken = (token) =>{
    console.log(token);
  }

  return (
    <>
      <Navbar user={user}/>
      <br></br>
      {cartProducts.length >= 1 && (
        <div className='container-fluid'>
          <h1 className='text-center'>My Cart</h1>
          <div className='products-box cart'>
            <CartProducts cartProducts={cartProducts}
            cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease} />
          </div>
          <div className='summary-box'>
            <h5>Cart Summary</h5>
            <br></br>
            <div>Total No of Products: <span>{totalQty}</span></div>
            <div>Total Price to Pay: <span>{totalAmt}</span></div>
            <br></br>
            <StripeCheckout stripeKey='pk_test_51NrjrDSDRecEiH5dxSwRfYsMvacLHVq0FOGHXJFLAfHm5SoTDzlAVprTur3PBKRbKq8RTxTl57GUOf8PuXhHKW7q00b6aDsDSA' 
            token={handleToken} 
            billingAddress 
            shippingAddress 
            name='All Products' 
            amount={totalAmt * 100}></StripeCheckout>
            {/**<br></br>**/}
            <h6 className='text-center' style={{marginTop: 7+'px'}}>OR</h6>
            <button className='btn btn-secondary btn-md' onClick={()=>triggerModal()}>Cash on Delivery</button>
          </div>
        </div>
      )}
      {cartProducts.length <1 && (
        <div className='container-fluid'>No Products to show
        <Link className='btn btn-danger btn-md' to = '/home'>Add Items</Link>
        </div>
      )}
      {showModal === true && (
        <Modal TotalPrice={totalAmt} hideModal={hideModal} totalQty={totalQty} />
      )}
    </>
  )
}