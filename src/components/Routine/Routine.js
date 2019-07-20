import React from 'react';
import './Routine.scss';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import stretchShape from '../../helpers/propz/stretchShape';
// import routineStretchData from '../../helpers/data/routineStretchData';


class Routine extends React.Component {
  // static propTypes = {
  //   stretch: stretchShape.stretchShape,
  // }
  // state = {
  //   stretches: [],
  // }

  // const routineId = this.props.match.params.id;

  // getRoutine = (routineId) => {
  //   routineStretchData.getRoutine(routineId)
  //     .then(stretches => this.setState({ stretches }))
  //     .catch(err => console.error('unable to get the routine', err));
  // }

  //   componentDidMount() {
  //     this.getRoutine(routineId);
  //   }

  render() {
    // const makeStretchCards = this.state.stretches.map(stretches => (
    //   <StretchCard
    //   key={stretch.id}
    //   stretch={stretch}
    //   />
    // ));

    return (
      <div className="Routine">
      <h1>Routine1234</h1>
       {/* <div className="d-flex">
       {makeStretchCards}
       </div> */}
      <Link className="btn btn-primary" to='/profile'>Back to my profile</Link>
      </div>
    );
  }
}

export default Routine;
