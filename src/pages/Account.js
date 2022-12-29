import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../Context/Auth";

import Review from "../components/Review";

const Account = () => {
  const auth = useAuth();
  const [reviews, setReviews] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleEmail, setToggleEmail] = useState(false);
  const [toggleUsername, setToggleUsername] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const fetchReviews = async () => {
    const reviews = await auth.getReviews();
    setReviews(reviews);
  };

  const updateEmail = async () => {
    const newEmail = auth.updateEmail(email);
    setEmail("");
    setToggleEmail(false);
    if (newEmail.error) {
      console.log(newEmail.error.message);
      alert("Error updating email.");
    } else {
      alert("Email updated successfully!");
    }
  };

  const updatePassword = async () => {
    const newPassword = auth.updatePassword(password);
    setPassword("");
    setTogglePassword(false);
    if (newPassword.error) {
      console.log(newPassword.error.message);
      alert("Error updating password.");
    } else {
      alert("Password updated successfully!");
    }
  };

  const updateUsername = async () => {
    const newUsername = auth.updateUsername(username);
    setUsername("");
    setToggleUsername(false);
    if (newUsername.error) {
      console.log(newUsername.error.message);
      alert("Error updating password.");
    } else {
      alert("Username updated successfully!");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="col">
        <h1>{auth.user.user_metadata.username}'s profile</h1>
      </div>
      <div className="row pt-2">
        <h3>Update Account</h3>
      </div>
      <div className="col pb-3">
        {toggleEmail ? (
          <div className="input-group mb-3">
            <input
              className="form-control"
              required="required"
              type="text"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              className="btn btn-light"
              type="button"
              onClick={() => setToggleEmail(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-dark"
              type="button"
              onClick={updateEmail}
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-dark mb-3"
              type="button"
              onClick={() => setToggleEmail(true)}
            >
              Update Email
            </button>
          </div>
        )}

        {toggleUsername ? (
          <div className="input-group mb-3">
            <input
              className="form-control"
              required="required"
              type="text"
              placeholder="Enter new username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button
              className="btn btn-light"
              type="button"
              onClick={() => setToggleUsername(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-dark"
              type="button"
              onClick={updateUsername}
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-dark mb-3"
              type="button"
              onClick={() => setToggleUsername(true)}
            >
              Update username
            </button>
          </div>
        )}

        {togglePassword ? (
          <div className="input-group mb-3">
            <input
              className="form-control"
              required="required"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="btn btn-light"
              type="button"
              onClick={() => setTogglePassword(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-dark"
              type="button"
              onClick={updatePassword}
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-dark mb-3"
              type="button"
              onClick={() => setTogglePassword(true)}
            >
              Update password
            </button>
          </div>
        )}
      </div>
      <div className="row">
        <h3>Your reviews</h3>
      </div>
      <div>
        {reviews
          .filter(
            (review) =>
              review.profiles.username === auth.user.user_metadata.username
          )
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

export default Account;
