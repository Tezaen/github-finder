import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class App extends Component{
  state = {
    users: [],
    loading: false
  }
  
  //Make proptypes required for certain props
  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  }

  /**
   * 
   * @param {This function allows already selected users to show up when opening the page} text 
   */

  // async componentDidMount() {
  //   //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
  //   this.setState({ loading: true});

  //   const res = await axios
  //     .get(`https://api.github.com/users?client_id=
  //     ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //     ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading:false });
  // }

  //search github users
  searchUsers = async (text) => {
    // console.log(text);
    this.setState({
      loading: true
    });

    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading:false });
  }

  render() {
    return (
      <div className='App'>
        <Navbar title={'Roober\'s Github Finder'}/>
        <div className="container">
          <Search searchUsers={ this.searchUsers }/>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
