import React from 'react';
import './LoginFailure.css';

export default class Rejected extends React.Component {

    render () {
        return(
            <div className='rejected'>
                <h1>Hmm . . . Looks like that login is invalid</h1>
                <a href={process.env.REACT_APP_LOGIN}>Please try again</a>
            </div>
            )
    }

}       