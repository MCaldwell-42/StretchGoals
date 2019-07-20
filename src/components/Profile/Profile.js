import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.scss';

class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
      <h1>My Profile</h1>
      <Link className="btn btn-primary" to='/routine'>View routine</Link>
      </div>
    );
  }
}

export default Profile;
