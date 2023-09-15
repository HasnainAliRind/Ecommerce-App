import React from 'react';

const RatingStars = ({ rating }) => {


  
  const fillStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#fff' : 'gray' }}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="rating">
      {fillStars(rating)}
    </div>
  );
};

export default RatingStars;
