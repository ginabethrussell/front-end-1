import React, {useState} from 'react';
import { Route, Link } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { UserContext } from './contexts/UserContext';

import Login from './components/Login';
import Signup from './components/Signup';
import Creator from './components/Creator';
import HowTos from './components/HowTos';

import logo from './logo.svg';
import './App.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const initialUser = {
  id: '',
  username: ''
}

function App() {
  const [user, setUser] = useState(initialUser);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // setup value for UserContext
  const value = {user: user, setUser: setUser};

  return (
    <div className="App"> 
      <Navbar color="dark" dark expand='md'>  
        <NavbarBrand>
          <img className='logo' style={{marginRight: '8px'}}src={logo} alt='logo' />
          <button className='logo-text' disabled>How-Tos</button>
        </NavbarBrand>
        <NavbarToggler dark onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink style={{width: '100px', textAlign: 'center'}}href='https://tt88-how-to.netlify.app/'>Home</NavLink>
          </NavItem>
          <NavItem style={{width: '100px', textAlign: 'center'}}>
            <NavLink tag={Link} to="/login">Login</NavLink>
          </NavItem>
          <NavItem style={{width: '100px', textAlign: 'center'}}>
            <NavLink tag={Link} to="/signup">Signup</NavLink>
          </NavItem>
          <NavItem style={{width: '100px', textAlign: 'center'}}>
            <NavLink color="light" tag={Link} to="/howtos">How-Tos</NavLink>
          </NavItem>
          <NavItem style={{width: '100px', textAlign: 'center'}}>
            <NavLink tag={Link} to="/creator">Creator</NavLink>
          </NavItem>
        </Nav>
        </Collapse>
      </Navbar>

      <main>
        <UserContext.Provider value={value}>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />

          {/* Private routes require a token in localStorage or redirect to /login */}
          <PrivateRoute path='/howtos' component={HowTos} />
          <PrivateRoute path='/creator'component={Creator} />
        </UserContext.Provider>
      </main>
    </div>
  );
}

export default App;
