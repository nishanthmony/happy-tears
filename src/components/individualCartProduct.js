import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import { auth, fs } from '../Config/config'


export const IndividualCartProduct = ({ cartProduct, cartProductIncrease, cartProductDecrease }) => {

  const handleCartProductIncrease=()=>{
    cartProductIncrease(cartProduct);
  }

  const handleCartProductDecrease=()=>{
    cartProductDecrease(cartProduct);
  }

  const handleCartProductDelete=()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart '+user.uid).doc(cartProduct.ID).delete().then(()=>{
          console.log('Successfully Deleted');
        })
      }
    })
  }


  return (
    <div className='product'>
      <div className='product-img'>
        <img src={cartProduct.url} alt='' />
      </div>
      <div className='product-text title'>{cartProduct.Title}</div>
      <div className='product-text description'>{cartProduct.Description}</div>
      <div className='product-text price'>₹ {cartProduct.Price}/-</div>

      <span>Quantity</span>
      <div className='product-text quantity-box'>
        <div className='action-btns minus' onClick={handleCartProductDecrease}>
            <Icon icon = {minus} size={20} />
        </div>
        <div>{cartProduct.qty}</div>
        <div className='action-btns plus'>
            <Icon icon = {plus} size={20} onClick={handleCartProductIncrease}/>
        </div>
      </div>
      <div className='product-text cart-price'>₹ {cartProduct.TotalProductPrice}/-</div>
      <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete}>DELETE</div>
    </div>
  )
}
