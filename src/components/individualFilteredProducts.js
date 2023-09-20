import React from 'react'

export const IndividualFilteredProducts = ({individualFilteredProducts, addToCart}) => {

  const handleAddToCart=()=>{
    addToCart(individualFilteredProducts);
  }

  return (
    <div className='product'>
      <div className='product-img'>
        <img src={individualFilteredProducts.url} alt=''/>
      </div>
      <div className='product-text title'>{individualFilteredProducts.Title}</div>
      <div className='product-text description'>{individualFilteredProducts.Description}</div>
      <div className='product-text price'>{individualFilteredProducts.Price}</div>
      <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>Add to Cart</div>
    </div>
  )
}
