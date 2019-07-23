import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import RoutineCard from '../RoutineCard/RoutineCard';
import routineData from '../../helpers/data/routineData';
import './Profile.scss';

class Profile extends React.Component {
  state = {
    routines: [],
  }

  getRoutines = () => {
    const { uid } = firebase.auth().currentUser;
    routineData.getRoutines(uid).then(routines => this.setState({ routines }))
      .catch(err => console.error('could not get routines', err));
  }

  componentDidMount() {
    this.getRoutines();
  }

  render() {
    const makeRoutineCards = this.state.routines.map(routine => (
      <RoutineCard
      key={routine.id}
      routine={routine}
      />
    ));
    return (
      <div className="profile col">
      <h1>My Profile</h1>
      <Link className="btn btn-primary" to='/stretches'>View Stretches</Link>
      <div className="routCards">
      {makeRoutineCards}
      </div>
      </div>
    );
  }
}

export default Profile;
