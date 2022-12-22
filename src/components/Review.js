import React from "react";

const Review = (props) => {
  return (
    <div className="card bg-light mb-2">
      <div className="card-header">
        {props.username}</div>
        <div></div>
      <div className="card-body d-flex justify-content-between align-items-center">
        {props.review}
      </div>
      
    </div>
  );
};

export default Review;
