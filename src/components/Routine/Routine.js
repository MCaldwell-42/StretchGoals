import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Routine.scss';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import routineData from '../../helpers/data/routineData';
import stretchShape from '../../helpers/propz/stretchShape';
import routineStretchData from '../../helpers/data/routineStretchData';
import stretchData from '../../helpers/data/stretchData';
import RoutineStretchCard from '../RoutineStretchCard/RoutineStretchCard';

const defaultRoutine = {
  name: '',
  uid: '',
};

class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      stretches: [],
      routine: {},
      newRoutine: defaultRoutine,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }

  formFieldStringState = (name, e) => {
    const tempRoutine = { ...this.state.newRoutine };
    tempRoutine[name] = e.target.value;
    this.setState({ newRoutine: tempRoutine });
  }

  nameChange = (e) => this.formFieldStringState('name', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newRoutine };
    const routineId = this.props.match.params.id;
    saveMe.uid = firebase.auth().currentUser.uid;
    routineData.putRoutine(saveMe, routineId)
      .then(() => {
        this.toggle();
        this.getRoutine();
      })
      .catch((err) => console.error('unable to save', err));
  }

  static propTypes = {
    stretch: stretchShape.stretchShape,
  }

  getRoutine = () => {
    const routineId = this.props.match.params.id;
    routineData.getSingleRoutine(routineId)
      .then((routinePromise) => this.setState({ routine: routinePromise.data }))
      .catch((err) => console.error('unable to get the routine', err));
  }

  getRoutineStretches = () => {
    const routineId = this.props.match.params.id;
    routineStretchData.getRoutineStretches(routineId)
      .then((response) => stretchData.routineStretches(response))
      .then((stretches) => this.setState({ stretches }))
      .catch((err) => console.error('unable to get the routine', err));
  }

  deleteRoutineStretch = (routineStretchId) => {
    routineStretchData.deleteRoutineStretch(routineStretchId)
      .then(() => this.getRoutineStretches())
      .catch((err) => console.error('unable to delete', err));
  }

  componentDidMount() {
    this.getRoutine();
    this.getRoutineStretches();
  }

  render() {
    const { routine } = this.state;
    const { newRoutine } = this.state;
    const makeStretchCards = this.state.stretches.map((stretch) => (
      <RoutineStretchCard
      key={stretch.id}
      stretch={stretch}
      routineId = {this.props.match.params.id}
      deleteRoutineStretch={this.deleteRoutineStretch}
      />
    ));

    return (
      <div className="Routine">
      <h1 id="routineHeader">{routine.name}</h1>
      <Button color="danger" onClick={this.toggle}>Edit Name</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="routineModal">
          <ModalHeader toggle={this.toggle}>Edit Name</ModalHeader>
          <ModalBody>
          <label htmlFor="name">New Routine Name?</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder={routine.name}
              value={newRoutine.name}
              onChange={this.nameChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.formSubmit}>Save Routine</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
       <div className="d-flex flex-wrap">
       {makeStretchCards}
       </div>
       <div className="routineLinks">
      <Link className="btn btn-primary" to='/profile'>Back to my profile</Link>
      <Link className="btn btn-success" to='/stretches'>Add Stretches</Link>
      </div>
      </div>
    );
  }
}

export default Routine;
