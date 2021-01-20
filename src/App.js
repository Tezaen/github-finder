import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import React, { Component } from 'react';


class App extends Component{
  render() {
    return (
      <div className='App'>
        <Navbar title={'Roober\'s Github Finder'}/>
        <div className="container">
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
