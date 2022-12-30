import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchField = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [realm, setRealm] = useState("");
  const [resultMessage, setResultMessage] = useState('');

  const handleSearchClick = (event) => {
    if (name !== "" && realm !== "") {
      fetchCharacter()
      setName("");
      setRealm("");
    } else {
      setResultMessage("Please enter both the character and realm name")
      event.preventDefault()
    }
  };

  const fetchCharacter = () => {
    fetch(
      `https://raider.io/api/v1/characters/profile?region=us&realm=${realm}&name=${name}&fields=guild%2Craid_progression%2Cmythic_plus_best_runs%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        switch(result.message) {
        case 'Could not find requested character':
          setResultMessage('Character does not exist on that realm')
          break;
          case `Failed to find realm ${realm} in region us`:
          setResultMessage("US realm doesn not exist.")
          break;
          default:
            navigate(`/character/${realm}/${name}`)
            
        }
      });
     
  };

  return (
    <div className="row justify-content-center p-5">
      <div className="d-flex justify-content-center p-2">
        <h1 className="font-weight-bold">Rate WoW Players</h1>
      </div>
      <div className="d-flex justify-content-center p-2">
        <h2 className="white-text">Search a player to get started</h2>
      </div>
      <input
        className="form-control form-control-lg mb-1"
        required="required"
        type="text"
        placeholder="Character"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        className="form-control form-control-lg mt-1"
        required="required"
        type="text"
        placeholder="Realm"
        value={realm}
        onChange={(e) => {
          setRealm(e.target.value);
        }}
      />

      <div className="d-flex justify-content-center p-2">
          <button
            className="btn btn-dark"
            type="button"
            onClick={handleSearchClick}
          >
            Look Up
          </button>
      </div>
      <span className="text-danger d-flex justify-content-center">{resultMessage}</span>
    </div>
  );
};

export default SearchField;
