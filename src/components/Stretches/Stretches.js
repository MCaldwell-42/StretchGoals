import React from 'react';
// import firebase from 'firebase/app';
import 'firebase/auth';
// import stretchData from '../../helpers/data/stretchData';
// import StretchCard from '../StretchCard/StretchCard';
import './Stretches.scss';


class Stretches extends React.Component {
  // state = {
  //   stretches: [],
  // }

  //   getStretches = () => {
  //     stretchData.getStretches().then(stretches => this.setState({ stretches }))
  //       .catch(err => console.error('could not get stretches', err));
  //   }

  //   componentDidMount() {
  //     this.getStretches();
  //   }

  // addStretch = () => {
  //   const stretchId = this.props.match.params.id;
  //   const routineId = id attached to dropdown button;
  //   stretchData.addStretch(stretchId, RoutineId)
  //     .then(() => this.props.history.push('/stretches'))
  //     .catch(err => console.error('unable to add stretch', err));
  // }

  render() {
    // const makeStretchCards = this.state.stretches.map(stretch => (
    //   <StretchCard
    //   key={stretch.id}
    //   stretch={stretch}
    //   addStretch ={this.addStretch}
    //   />
    // ));

    return (
      <div className="Stretches col">
      <h1>Stretches</h1>
      {/* <div className="d-flex">
       {makeStretchCards}
       </div> */}
      </div>
    );
  }
}

export default Stretches;
