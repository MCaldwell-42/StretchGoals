import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RoutineStretchCard.scss';

class RoutineStretchCard extends React.Component {
  static propTypes = {
    deleteRoutineStretch: PropTypes.func.isRequired,
  }

  deleteMe = (e) => {
    e.preventDefault();
    const { stretch, deleteRoutineStretch } = this.props;
    deleteRoutineStretch(stretch.id);
  }

  render() {
    const { stretch } = this.props;
    const singleLink = `/single/${stretch.stretchId}`;

    return (
      <div className="RoutineStretchCard col-4">
        <div className="card" >
          <div className="card-body">
            <h5 className="card-title">{stretch.name}</h5>
            <h6 className="difficulty">{stretch.difficulty}</h6>
            <Link className="btn btn-success" to={singleLink}>View</Link>
            <button className="btn btn-danger" id={stretch.id} onClick={this.deleteMe}>Remove From Routine</button>
          </div>
        </div>
      </div>
    );
  }
}

export default RoutineStretchCard;
