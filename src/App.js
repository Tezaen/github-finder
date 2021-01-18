import './App.css';
import Navbar from './components/layout/Navbar';
import React, { Component } from 'react';

class App extends Component{
  render() {
    return (
      <div className='App'>
        <Navbar />
      </div>
    );
  }
}

export default App;
