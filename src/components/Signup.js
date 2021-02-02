import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../contexts/UserContext';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const initialUserCredentials = {
  username: "",
  password: "",
  role: "subscriber",
};

function Signup() {
  const [userCredentials, setUserCredentials] = useState(
    initialUserCredentials
  );
  const [loginError, setLoginError] = useState("");
  const {setUser} = useContext(UserContext);
  const history = useHistory();

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const signupUser = (e) => {
    e.preventDefault();
    console.log(userCredentials);
    
    // use axios to post user data, response should be token and user id
    axios
      .post("https://gbr-how-to.herokuapp.com/users", userCredentials)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setLoginError("");
        setUser({username: userCredentials.username, id: res.data.user.id})
        history.push("/howtos");
      })
      .catch((err) => {
          console.log(err);
          setLoginError('An error occurred. Please try again.');
      });
    setUserCredentials(initialUserCredentials);
  };

  return (
    <div className="form-wrapper">
      <h2>Signup for an Account</h2>
      <Form className="form" onSubmit={signupUser}>
        <FormGroup>
          <Label for="username">
            Username:
          </Label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder='username'
            value={userCredentials.username}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">
            Password:
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder='password'
            value={userCredentials.password}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
            <Label for="role">Select</Label>
            <Input type="select" name="role" id="role" value={userCredentials.role} onChange={handleChange}>
            <option value='subscriber'>Subscriber</option>
            <option value='creator'>Creator</option>
            </Input>
        </FormGroup>
        <div className='btn-wrapper'>
            <Button color="info" type="submit">
                Signup
            </Button>
        </div>
        {loginError !== ''? (<p className='error-message'>{loginError}</p>): null }
      </Form> 
    </div>
  );
}

export default Signup;


