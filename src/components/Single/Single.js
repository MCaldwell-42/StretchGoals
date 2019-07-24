import React from 'react';
import './Single.scss';
import { Link } from 'react-router-dom';
import stretchData from '../../helpers/data/stretchData';


class Single extends React.Component {
  state = {
    stretch: {},
  }

  componentDidMount() {
    const stretchId = this.props.match.params.id;
    stretchData.getSingleStretch(stretchId)
      .then(stretchPromise => this.setState({ stretch: stretchPromise.data }))
      .catch(err => console.error('unable to get the stretch', err));
  }

  // addStretch = () => {
  //   const stretchId = this.props.match.params.id;
  //   const routineId = id attached to dropdown button;
  //   stretchData.addStretch(stretchId, RoutineId)
  //     .then(() => this.props.history.push('/stretches'))
  //     .catch(err => console.error('unable to add stretch', err));
  // }

  render() {
    const { stretch } = this.state;
    return (
      <div className="Singlestretch">
      <h1>{stretch.name}</h1>
      <h3>{stretch.difficulty}</h3>
      <h1>`duration: {stretch.duration} minutes`</h1>
      {/* <button className="btn btn-danger" onClick={this.addStretch}>Add To Routine</button> */}
      <Link className="btn btn-primary" to='/stretches'>Back to Stretches</Link>
      </div>
    );
  }
}

export default Single;
