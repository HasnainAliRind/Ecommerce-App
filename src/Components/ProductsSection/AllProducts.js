import React, { useState } from 'react'
import CategorySide from './CategorySide'
import Products from './Products'
import CategorySectionPhone from './CategorySectionPhone'

function AllProducts() {

  return (
    <div className='AllProductsSection'>
        <CategorySide/>
        <CategorySectionPhone/>
        <Products/> 
      </div>
  )
}

export default AllProducts
