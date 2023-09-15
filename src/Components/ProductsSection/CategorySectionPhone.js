import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


function CategorySectionPhone() {
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
    return (
        <div className='CategorySectionPhone'>
            <h2>Categories</h2>
            <div className='categories'>
            <Carousel responsive={responsive}>
                {
                    category.map((cat) => {
                        return <button className='category' key={cat}>{cat}</button>
                    })
                }
            </Carousel>
            </div>
        </div>
    )
}

export default CategorySectionPhone
