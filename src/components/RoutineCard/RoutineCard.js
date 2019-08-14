import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import routineShape from '../../helpers/propz/stretchShape';
import './RoutineCard.scss';


class RoutineCard extends React.Component {
  static propTypes = {
    routine: routineShape.routineShape,
    deleteRoutine: PropTypes.func.isRequired,
  }

  deleteMe = (e) => {
    e.preventDefault();
    const { routine, deleteRoutine } = this.props;
    deleteRoutine(routine.id);
  }

  render() {
    const { routine } = this.props;
    const routineLink = `/routine/${routine.id}`;

    return (
      <div className="RoutineCard col-12">
        <div className="card" >
          <div className="card-body">
          <button className="btn btn-danger" onClick={this.deleteMe}>x</button>
            <h2 className="card-title">{routine.name}</h2>
            <Link className="btn btn-success" to={routineLink}>View Routine</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RoutineCard;
