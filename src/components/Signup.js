import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
  role: "",
};

function Signup() {
  const [userCredentials, setUserCredentials] = useState(
    initialUserCredentials
  );
  const [loginError, setLoginError] = useState("");
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
    // sample user credentials
    const testCredentials = {
      email: "lambda-student@lambda.com",
      password: "i<3Lambd4",
      role: 'subscriber'
    };
    // sample post request to login user
    // sample token for testing
    const token = "QpwL5tke4Pnpja7X4";
    axios
      .post("https://reqres.in/api/users", testCredentials)
      .then((res) => {
        // will have token from backend api
        console.log(res);
        localStorage.setItem("token", token);
        setLoginError("");
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
            <Button color="primary" type="submit">
                Login
            </Button>
        </div>
        {loginError !== ''? (<p className='error-message'>{loginError}</p>): null }
      </Form> 
    </div>
  );
}

export default Signup;


