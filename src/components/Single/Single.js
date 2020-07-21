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
      .then((stretchPromise) => this.setState({ stretch: stretchPromise.data }))
      .catch((err) => console.error('unable to get the stretch', err));
  }

  render() {
    const { stretch } = this.state;
    return (
      <div className="Singlestretch">
      <h1>{stretch.name}</h1>
      <h2>difficulty: {stretch.difficulty}</h2>
      <h2>recommended duration: {stretch.duration} minutes</h2>
      <iframe width="560" height="315" src={stretch.videoUrl} title={stretch.name} frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <Link className="btn btn-primary" to='/stretches'>Back to Stretches</Link>
      </div>
    );
  }
}

export default Single;
