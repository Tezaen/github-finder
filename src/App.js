import './App.css';
import Navbar from './components/layout/Navbar';
import UserItem from './components/users/UserItem';
import React, { Component } from 'react';

class App extends Component{
  render() {
    return (
      <div className='App'>
        <Navbar title={'Roober\'s Github Finder'}/>
        <UserItem />
      </div>
    );
  }
}

export default App;
