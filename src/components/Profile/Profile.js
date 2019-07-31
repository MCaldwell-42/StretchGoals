import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import RoutineCard from '../RoutineCard/RoutineCard';
import routineData from '../../helpers/data/routineData';
import './Profile.scss';

const defaultRoutine = {
  name: '',
  uid: '',
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      routines: [],
      newRoutine: defaultRoutine,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  formFieldStringState = (name, e) => {
    const tempRoutine = { ...this.state.newRoutine };
    tempRoutine[name] = e.target.value;
    this.setState({ newRoutine: tempRoutine });
  }

  nameChange = e => this.formFieldStringState('name', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newRoutine };
    saveMe.uid = firebase.auth().currentUser.uid;
    routineData.postRoutine(saveMe)
      .then(() => {
        this.toggle();
        this.getRoutines();
      })
      .catch(err => console.error('unable to save', err));
  }

  getRoutines = () => {
    const { uid } = firebase.auth().currentUser;
    routineData.getRoutines(uid).then(routines => this.setState({ routines }))
      .catch(err => console.error('could not get routines', err));
  }

  componentDidMount() {
    this.getRoutines();
  }

  deleteRoutine = (routineId) => {
    routineData.deleteRoutine(routineId)
      .then(() => this.getRoutines())
      .catch(err => console.error('unable to delete', err));
  }

  render() {
    const makeRoutineCards = this.state.routines.map(routine => (
      <RoutineCard
      key={routine.id}
      routine={routine}
      deleteRoutine={this.deleteRoutine}
      />
    ));
    const { newRoutine } = this.state;
    return (
      <div className="profile col">
      <h1>My Profile</h1>
      <Link className="btn btn-primary" to='/stretches'>View All Stretches</Link>
      <Button color="danger" onClick={this.toggle}>New Routine</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="routineModal">
          <ModalHeader toggle={this.toggle}>New Routine</ModalHeader>
          <ModalBody>
          <label htmlFor="name">Routine Name?</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Stretch it out"
              value={newRoutine.name}
              onChange={this.nameChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.formSubmit}>Save Routine</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      <div className="routCards">
      {makeRoutineCards}
      </div>
      </div>
    );
  }
}

export default Profile;
