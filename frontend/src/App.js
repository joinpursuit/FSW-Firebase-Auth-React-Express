import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './containers/home';
import Signup from './containers/signup';
import Login from './containers/login';
import Logout from './containers/Logout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Route path='/' component={ Header } />
          <div className='container mt-5'>
            <Route path='/' exact component={ Home } />
            <Route path='/signup' exact component={ Signup } />
            <Route path='/login' exact component={ Login } />
            <Route path='/logout' exact component={ Logout } />
          </div>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
