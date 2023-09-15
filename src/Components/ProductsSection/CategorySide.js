import React, { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { setCurrentCategory } from '../../Redux/Slice'

function CategorySide() {
    let category =
[
  'Shirt',                'Gaget',
  'Sports',               'Home Decoration',
  'Electronics',          'clocks',
  'Jewelry',              'Office Supplies',
  'Travel Product',       'Fashion Product',
  'Stationery Book',      'Toys & Games',
  'Appliances',           'Automotive',
  'Pet Supplies',         'Art & Craft Supplies',
  'Music Instruments',    'Eco-friendly Product',
  'Baking Supplies',      'Cleaning_Supplies',
  'Clothing Accessories', 'Party Supplies',
  'Furniture',            'DIY Kits'
];
  
 
  let currentCategory = useSelector(state=>state.appstate.currentCategory)
  let dispatch = useDispatch()
  return (
    <div className='CategorySide'>
      <h2>Categories</h2>
      <div className='categories'>
        {
            category.map((category,index)=>{
                return <li key={category} className={index===currentCategory.index ? "active" : "category"} onClick={()=>{
                  dispatch(setCurrentCategory({index , category}))
                }}>{category}</li>
            })
        }
      </div>
    </div>
  )
}

export default CategorySide
