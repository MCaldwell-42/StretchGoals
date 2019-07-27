import React from 'react';
import { Link } from 'react-router-dom';
import {
  ButtonDropdown, DropdownToggle, DropdownMenu,
} from 'reactstrap';
import PropTypes from 'prop-types';
import RoutineOption from '../RoutineOption/RoutineOption';
import routineStretchData from '../../helpers/data/routineStretchData';
import stretchShape from '../../helpers/propz/stretchShape';
import './StretchCard.scss';


class StretchCard extends React.Component {
  static propTypes = {
    stretch: stretchShape.stretchShape,
    addStretch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      routines: this.props,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  addMe = (routineId) => {
    const { stretch } = this.props;
    const newRoutineStretch = {
      stretchId: stretch.id,
      routineId,
    };
    routineStretchData.addRoutineStretch(newRoutineStretch)
      .then(() => this.toggle())
      .catch(err => console.error('couldnt add stretch', err));
  }

  render() {
    const { stretch, routines } = this.props;

    const routineChoices = routines.map(routine => (
      <RoutineOption key={routine.id} routineOption={routine} addMe={this.addMe}/>
    ));

    const singleLink = `/single/${stretch.id}`;

    return (
      <div className="StretchCard col-4">
        <div className="card" >
          <div className="card-body">
            <h5 className="card-title">{stretch.name}</h5>
            <h6 className="difficulty">{stretch.difficulty}</h6>
            <Link className="btn btn-success" to={singleLink}>View</Link>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Add To Routine
        </DropdownToggle>
        <DropdownMenu>
          {routineChoices}
        </DropdownMenu>
      </ButtonDropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default StretchCard;
