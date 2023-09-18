import React from 'react'
import {IndividualProduct} from './individualProduct'

export const Products = ({DisplayProducts}) => {
  
  console.log(DisplayProducts);
  
  return DisplayProducts?.map((individualProduct)=>(
    <IndividualProduct key={individualProduct.ID} individualProject={individualProduct}/>
  ))
}