import React from "react";
import { Link } from "react-router-dom";

const Review = (props) => {
  return (
    <div className="card bg-light mb-2">
      <div className="card-header"> <Link className="text-dark" to={`/u/${props.username}`}>{props.username}</Link>'s review for <Link className="text-dark" to={`/character/${props.realm}/${props.character}`}>{props.character}</Link></div>
      <div className="card-body d-flex justify-content-between align-items-center">
        {props.review}
      </div>
    </div>
  );
};

export default Review;
