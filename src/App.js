import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  state = {
    users: [], //the search result of user input
    user: {}, //a single user's information
    loading: false,
    alert: null
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

    this.setState({ users: res.data.items, loading: false });
  }

  //get a single github user Username is the same as login in github api data
  getUser = async (username) => {
    this.setState({
      loading: true
    });

    const res = await axios
      .get(`https://api.github.com/users/${username}?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

  //clear users from the state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  //set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } }); //same as { msg: msg, type: type }
    //This commented out code was by Brad Traversy in his Udemy course react front to back, I've opted to use try and use and (x) button
    setTimeout(() => {
      this.setState({ alert: null })
    }, 5000);
  }

  render() {
    const { users, loading, user } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar title={'Roober\'s Github Finder'} />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} user={user} loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
