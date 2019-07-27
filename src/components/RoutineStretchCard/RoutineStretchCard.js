import React from 'react';
import { Link } from 'react-router-dom';
// import stretchData from '../../helpers/data/stretchData';
import PropTypes from 'prop-types';
import stretchShape from '../../helpers/propz/stretchShape';
import './RoutineStretchCard.scss';


class RoutineStretchCard extends React.Component {
  static propTypes = {
    stretch: stretchShape.stretchShape,
    // deleteStretch: PropTypes.func.isRequired,
  }

  // deleteMe = (e) => {
  //   e.preventDefault();
  //   const { stretch, addStretch } = this.props;
  //   addStretch(stretch.id, routine.id);
  // }

  render() {
    const { stretch } = this.props;
    const singleLink = `/single/${stretch.id}`;

    return (
      <div className="RoutineStretchCard col-4">
        <div className="card" >
          <div className="card-body">
            <h5 className="card-title">{stretch.name}</h5>
            <h6 className="difficulty">{stretch.difficulty}</h6>
            <Link className="btn btn-success" to={singleLink}>View</Link>
            {/* <button className="btn btn-danger" onClick={this.deleteMe}>Remove From Routine</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default RoutineStretchCard;