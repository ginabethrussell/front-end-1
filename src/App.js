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

const initialUser = {
  id: '',
  username: ''
}

function App() {
  const [user, setUser] = useState(initialUser);
  const value = {user: user, setUser: setUser};
  return (
    <div className="App"> 
      <nav>  
        <h2><img className='logo' src={logo} alt='logo' />How-Tos</h2>
        <div className='navlinks'>
          <a href='https://tt88-how-to.netlify.app/'>Home</a>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
          <Link to='/howtos'>How-Tos</Link>
          <Link to='/creator'>Creator</Link>
        </div>
      </nav>

      <main>
        <UserContext.Provider value={value}>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />

        {/* Below will become private routes in final app */}
        {/* <Route path='/howtos' component={HowTos} />
        <Route path='/creator' component={Creator} /> */}

        <PrivateRoute path='/howtos' component={HowTos} />
        <PrivateRoute path='/creator'component={Creator} />
        </UserContext.Provider>
      </main>
    </div>
  );
}

export default App;
