import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./Character.css";

import Review from "../components/Review";
import Navbar from "../components/Navbar";
import { useAuth } from "../Context/Auth";

const Character = () => {
  const auth = useAuth();
  const params = useParams();
  const [showingData, setShowingData] = useState(false);
  const [character, setCharacter] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);


  const fetchCharacter = () => {
    fetch(
      `https://raider.io/api/v1/characters/profile?region=us&realm=${params.realm}&name=${params.name}&fields=guild%2Craid_progression%2Cmythic_plus_best_runs%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks`
    )
      .then((res) => res.json())
      .then((result) => {
        setCharacter(result);
        setShowingData(true);
        console.log(result);
      });
  };

  const guildName = (character) => {
    if (character.guild !== null) {
      return character.guild.name;
    } else {
      return "";
    }
  };

  const fetchReviews = async () => {
    const reviews = await auth.getReviews();
    setReviews(reviews);
  };

  const addNewReview = async() => {
    const userId = auth.user.id;
    const id = uuidv4();

    const newReview = await auth.addReview(id, review, character.profile_url, character.name, character.realm, userId)
    console.log(newReview)
    setReview("");
    const reload = await fetchReviews()

    return reload;
    
  }

  useEffect(() => {
    fetchCharacter();
    fetchReviews();
  }, []);

  return (
    <div className="container mt-2">
      <div>
        <Navbar />
      </div>
      <div>
        {showingData ? (
          <div className="row justify-content-center p-2 mt-2">
            <div className={character.profile_banner}>
              <div className="row">
                <img
                  className="profile-image"
                  src={character.thumbnail_url}
                  alt="character's portrait"
                />
                <div className="col">
                  <h3 className="character-name">{character.name}</h3>
                  <h4 className="guild-name">{guildName(character)}</h4>
                  <h5 className="realm-name">{character.realm}</h5>
                  <div className="d-flex justify-content-start">
                    <div className="row pe-1">
                      <h5 className={character.faction}>{character.race}</h5>
                    </div>

                    <h5 className={character.class.replaceAll(" ", "-")}>
                      {character.class}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <h3 className="summary">Summary</h3>
              <div className="col">
                <h4>Raid Progression</h4>
                <h6>
                  Normal Vault of the Incarnates:{" "}
                  {
                    character.raid_progression["vault-of-the-incarnates"]
                      .normal_bosses_killed
                  }
                </h6>
                <h6>
                  Heroic Vault of the Incarnates:{" "}
                  {
                    character.raid_progression["vault-of-the-incarnates"]
                      .heroic_bosses_killed
                  }
                </h6>
                <h6>
                  Mythic Vault of the Incarnates:{" "}
                  {
                    character.raid_progression["vault-of-the-incarnates"]
                      .mythic_bosses_killed
                  }
                </h6>
              </div>
              <div className="col">
                <h4>Mythic +</h4>
                <div className="row justify-content-start">
                  <div className="col">
                    <h5>Overall:</h5>
                    <h6>
                      Region: {character.mythic_plus_ranks.overall.region}
                    </h6>
                    <h6>Realm: {character.mythic_plus_ranks.overall.realm}</h6>
                  </div>
                  <div className="col justify-content-start">
                    <h5>Class:</h5>
                    <h6>Region: {character.mythic_plus_ranks.class.region}</h6>
                    <h6>Realm: {character.mythic_plus_ranks.class.realm}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center pt-5">
              
                <div className="col justify-content-center">
                  <div>
                    {reviews
                      .filter(
                        (review) =>
                          review.character_id === character.profile_url
                      )
                      .map((review) => (
                        <Review
                          username={review.profiles.username}
                          character = {review.character}
                          realm= {review.realm}
                          review={review.review}
                          key={review.id}
                        />
                      ))}
                    { auth.user ? (
                      <div>
                    <textarea
                      className="form-control"
                      required="required"
                      placeholder="Add review..."
                      value={review}
                      onChange={(e) => {
                        setReview(e.target.value);
                      }}
                    ></textarea>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={addNewReview}
                    >
                      Add Review
                    </button>
                  </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center mt-3">
                        <Link to="/login">
                          <button
                        className="btn btn-dark"
                        type="button"
                      >
                        Sign in to add a review
                      </button>
                        </Link>
                    
                    </div>
                    )
                    }
                    </div>
                    
                </div>
           
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Character;
