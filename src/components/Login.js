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
  password: ""
};

function Login() {
  const [userCredentials, setUserCredentials] = useState(initialUserCredentials);
  const [loginError, setLoginError] = useState("");
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    console.log(userCredentials);
   
    // use axios to post user data, response should be token and user id
    axios
      .post("https://gbr-how-to.herokuapp.com/users/login", userCredentials)
      //.post("http://localhost:5000/users/login", userCredentials)
      .then((res) => {
        console.log(res.data);
        const token = res.data.token;
        localStorage.setItem("token", token);
        setUser({ ...user,
            username: userCredentials.username,
            id: res.data.id
          });
        setLoginError("");
        setUserCredentials(initialUserCredentials);
        history.push("/howtos");
      })
      .catch((err) => {
          // api returns that user is not found. Set error message to be displayed.
          console.log(err);
          setLoginError('User not found. Please signup for an account.');
      });  
   
  };

  return (
    <div className="form-wrapper">
      <h2>Login to Your Account</h2>
      <Form className="form" onSubmit={loginUser}>
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
        <div className='btn-wrapper'>
            <Button color="info" type="submit">
                Login
            </Button>
        </div>
        {loginError !== ''? (<p className='error-message'>{loginError}</p>): null }
      </Form> 
    </div>
  );
}

export default Login;
