import React from 'react';
import { Route, Link } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import Login from './components/Login';
import Signup from './components/Signup';
import Creator from './components/Creator';
import HowTos from './components/HowTos';

import './App.css';

function App() {
  return (
    <div className="App"> 
      <nav>
        <h2>How-Tos</h2>
        <div className='navlinks'>
          <a href='https://tt88-how-to.netlify.app/'>Home</a>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
          <Link to='/howtos'>How-Tos</Link>
          <Link to='/creator'>Creator</Link>
        </div>
      </nav>

      <main>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />

        {/* Below will become private routes in final app */}
        <Route path='/howtos' component={HowTos} />
        <Route path='/creator' component={Creator} />

        {/* <PrivateRoute path='/howtos' component={HowTos} />
        <PrivateRoute path='/creator'component={Creator} /> */}
      </main>
    </div>
  );
}

export default App;
