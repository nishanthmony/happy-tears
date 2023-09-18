import React from 'react'

export const IndividualProduct = ({individualProject}) => {
  console.log(individualProject);
  return (
    <div className='product'>
      <div className='product-img'>
        <img src={individualProject.url} alt='' />
      </div>
      <div className='product-text title'>{individualProject.Title}</div>
      <div className='product-text description'>{individualProject.Description}</div>
      <div className='product-text price'>$ {individualProject.Price}</div>
      <div className='btn btn-danger btn-md cart-btn'>Add to Cart</div>
    </div>
  )
}
