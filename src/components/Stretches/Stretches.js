import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import stretchData from '../../helpers/data/stretchData';
import routineData from '../../helpers/data/routineData';
import StretchCard from '../StretchCard/StretchCard';
import './Stretches.scss';


class Stretches extends React.Component {
  state = {
    stretches: [],
    routines: [],
  }

    getStretches = () => {
      stretchData.getStretches().then(stretches => this.setState({ stretches }))
        .catch(err => console.error('could not get stretches', err));
    }

    getRoutines = () => {
      const { uid } = firebase.auth().currentUser;
      routineData.getRoutines(uid).then(routines => this.setState({ routines }))
        .catch(err => console.error('could not get routines', err));
    }

    getStretchesByBodyPartId = (bodypartId) => {
      stretchData.getStretchesByBodyPart(bodypartId).then(stretches => this.setState({ stretches }))
        .catch(err => console.error('could not get stretches by bodypart', err));
    }

    componentDidMount() {
      const bodypartId = this.props.location.search.split('=')[1];
      if (bodypartId) {
        this.getStretchesByBodyPartId(bodypartId);
      } else {
        this.getStretches();
      }
      this.getRoutines();
    }

    render() {
      const makeStretchCards = this.state.stretches.map(stretch => (
      <StretchCard
      key={stretch.id}
      stretch={stretch}
      routines={this.state.routines}
      />
      ));

      return (
      <div className="Stretches col">
      <h1>Stretches</h1>
      {this.props.location.search.length ? (<button className="btn btn-primary" onClick={() => { this.props.history.push('/stretches'); this.getStretches(); }}>View All Stretches</button>) : ''}
      <div className="d-flex flex-wrap">
       {makeStretchCards}
       </div>
      </div>
      );
    }
}

export default Stretches;
