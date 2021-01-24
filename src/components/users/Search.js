import React, { useState } from 'react';
import PropTypes from 'prop-types';

//from props
const Search = ({ clearUsers, showClear, searchUsers, setAlert }) => {
    //const [name of piece in the state, function to manipulate that value of the piece (usually setNameOfPiece)]
    const [text, setText] = useState('');

    const onChange = (e) => setText(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        if (text === '') {
            setAlert('Please enter something', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };

    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange} />
                <input type="submit" value="search" className="btn btn-dark btn-block" />
            </form>
            {showClear && (
                <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
            )}
        </div>
    )

}

//Make proptypes required for certain props
Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search
