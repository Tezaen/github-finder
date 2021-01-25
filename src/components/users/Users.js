import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
    const githubContext = useContext(GithubContext);

    // deconstructing from githubContext
    const { loading, users } = githubContext;

    if (loading) {
        console.log("Users comp: loading true");
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    }
    
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}


export default Users
