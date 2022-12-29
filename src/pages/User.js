import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../Context/Auth";
import Navbar from "../components/Navbar";
import Review from "../components/Review";

const User = () => {
  const params = useParams();
  const auth = useAuth();
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const reviews = await auth.getReviews();
    setReviews(reviews);
  };

useEffect(()=> {
    fetchReviews();
},[])

  return (
    <div className="container">
      <Navbar />
      <h1>{params.user}</h1>
      <div>
           {reviews
          .filter((review) => review.profiles.username === params.user)
          .map((review) => (
            <Review
              username={review.profiles.username}
              character={review.character}
              realm={review.realm}
              review={review.review}
              id={review.id}
            />            
          ))}
     
      </div>
    </div>
  );
};

export default User;
