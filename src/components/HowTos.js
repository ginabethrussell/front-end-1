import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {Spinner} from 'reactstrap';
import HowTo from "./HowTo";

import { Label, Input } from "reactstrap";
// Sample Data - will come from api get request for howtos
// import testHowtos from "../data/howtos";

// component will display all existing howtos for logged in user
function HowTos() {
  const { user } = useContext(UserContext);
  const [howtos, setHowtos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchterm, setSearchterm] = useState("");
  const [filteredHowtos, setFilteredHowtos] = useState(howtos);

  const handleChange = (e) => {
    setSearchterm(e.target.value);
  };

  // get all howtos from the api and display when component mounts
  // use an authorized get request to howtos route
  useEffect(() => {
    axiosWithAuth()
      .get("https://gbr-how-to.herokuapp.com/howtos")
      .then((res) => {
        console.log(res);
        setError("");
        setIsLoading(false);
        setHowtos(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Unable to load How-tos. Please try again later.");
      });
  }, []);

  // filter howtos by title when the howtos or searchterm changes
  useEffect(() => {
    setFilteredHowtos(
      howtos.filter((howto) =>
        howto.title.toLowerCase().includes(searchterm.toLowerCase())
      )
    );
  }, [searchterm, howtos]);

  if (error !== "") {
    return <div>{error}</div>;
  } else {
    return (
      <div className="howtos-wrapper">
        <div className="howto-header">
          <h2>Welcome {user.username}</h2>
          <div className="formgroup">
            <Label
              style={{ textAlign: "right", marginRight: "8px" }}
              for="searchterm"
            >
              Search by Title
            </Label>
            <Input
              type="text"
              name="searchterm"
              id="searchterm"
              placeholder="enter a keyword"
              value={searchterm}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {isLoading ? (
            <p className='loading'><Spinner/> ...Loading How-Tos... <Spinner/></p>
        ) : (
          <>
            {filteredHowtos.map((howto) => (
              <div className='howto-wrapper'>
                <HowTo key={howto.id} howto={howto} />
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}

export default HowTos;
