import React from 'react';
import './Single.scss';
import { Link } from 'react-router-dom';
import {
  ButtonDropdown, DropdownToggle, DropdownMenu,
} from 'reactstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import stretchData from '../../helpers/data/stretchData';
import routineData from '../../helpers/data/routineData';
import RoutineOption from '../RoutineOption/RoutineOption';
import routineStretchData from '../../helpers/data/routineStretchData';
import 'firebase/auth';

class Single extends React.Component {
  state = {
    stretch: {},
    routines: [],
  }

  static propTypes = {
    addStretch: PropTypes.func.isRequired,
  }

  getRoutines = () => {
    const { uid } = firebase.auth().currentUser;
    routineData.getRoutines(uid).then((routines) => this.setState({ routines }))
      .catch((err) => console.error('could not get routines', err));

    console.error(routineData);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const stretchId = this.props.match.params.id;
    stretchData.getSingleStretch(stretchId)
      .then((stretchPromise) => this.setState({ stretch: stretchPromise.data }))
      .catch((err) => console.error('unable to get the stretch', err));
    this.getRoutines();
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  addMe = (routineId) => {
    const stretchId = this.props.match.params.id;
    const newRoutineStretch = {
      stretchId,
      routineId,
    };
    routineStretchData.addRoutineStretch(newRoutineStretch)
      .then(() => this.state.dropdownOpen)
      .catch((err) => console.error('couldnt add stretch', err));
  }

  render() {
    const { stretch, routines } = this.state;

    const routineChoices = routines.map((routine) => (
      <RoutineOption key={routine.id} routineOption={routine} addMe={this.addMe}/>
    ));

    return (
      <div className="Singlestretch">
      <div id="singleStretchHead">
      <h1>{stretch.name}</h1>
      <h2>difficulty: {stretch.difficulty}</h2>
      <h2>recommended duration: {stretch.duration} minutes</h2>
      <Link className="btn btn-primary returnBtn" to='/stretches'>Back to Stretches</Link>
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Add To Routine
        </DropdownToggle>
        <DropdownMenu>
          {routineChoices}
        </DropdownMenu>
      </ButtonDropdown>
      </div>
      <iframe width="560" height="315" src={stretch.videoUrl} title={stretch.name} frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    );
  }
}

export default Single;
