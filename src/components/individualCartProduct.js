import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'


export const IndividualCartProduct = ({cartProduct}) => {
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
        <div className='action-btns minus'>
            <Icon icon = {minus} size={20} />
        </div>
        <div>{cartProduct.qty}</div>
        <div className='action-btns plus'>
            <Icon icon = {plus} size={20} />
        </div>
      </div>
      <div className='product-text cart-price'>₹ {cartProduct.TotalProductPrice}</div>
      <div className='btn btn-danger btn-md cart-btn'>Remove</div>
    </div>
  )
}
