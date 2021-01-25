import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GithubState from './context/github/GithubState';

const App = () => {
  //const [name of piece in the state, function to manipulate that value of the piece (usually setNameOfPiece)]
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

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
  const searchUsers = async (text) => {
    // console.log(text);
    setLoading(true);

    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
  }

  //get a single github user Username is the same as login in github api data
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios
      .get(`https://api.github.com/users/${username}?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  }

  //get users repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios
      .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    setRepos(res.data);
    setLoading(false);
  }

  //clear users from the state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //set alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type }) //same as { msg: msg, type: type }
    //This commented out code was by Brad Traversy in his Udemy course react front to back, I've opted to use try and use and (x) button
    setTimeout(() => setAlert(null), 5000);
  }

  return (
    <GithubState>
    <Router>
      <div className='App'>
        <Navbar title={'Roober\'s Github Finder'} />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClear={users.length > 0 ? true : false}
                  setAlert={showAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
    </GithubState>
  );
}

export default App;
