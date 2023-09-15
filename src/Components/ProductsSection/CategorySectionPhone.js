import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { setCurrentCategory } from '../../Redux/Slice';
import { useDispatch, useSelector } from 'react-redux';


function CategorySectionPhone() {
    let currentCategory = useSelector(state=>state.appstate.currentCategory);

    let category =
        [
            'Shirt', 'Gaget',
            'Sports', 'Home Decoration',
            'Electronics', 'clocks',
            'Jewelry', 'Office Supplies',
            'Travel Product', 'Fashion Product',
            'Stationery Book', 'Toys & Games',
            'Appliances', 'Automotive',
            'Pet Supplies', 'Art & Craft Supplies',
            'Music Instruments', 'Eco-friendly Product',
            'Baking Supplies', 'Cleaning_Supplies',
            'Clothing Accessories', 'Party Supplies',
            'Furniture', 'DIY Kits'
        ];
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 774, min: 564 },
            items: 3
        },
        phone: {
            breakpoint: { max: 564, min: 400 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 400, min: 0 },
            items: 2
        }
    };
    let dispatch = useDispatch();
    return (
        <div className='CategorySectionPhone'>
            <h2>Categories</h2>
            <div className='categories'>
            <Carousel responsive={responsive}>
                {
                    category.map((cat, index) => {
                        return <button className={index===currentCategory.index ? "active" : "category"} key={cat} onClick={()=>{
                            dispatch(setCurrentCategory({index , category: cat}))
                        }}>{cat}</button>
                    })
                }
            </Carousel>
            </div>
        </div>
    )
}

export default CategorySectionPhone
