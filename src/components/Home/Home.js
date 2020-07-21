import React from 'react';
import { Link } from 'react-router-dom';
import {
  ButtonDropdown, DropdownToggle, DropdownMenu,
} from 'reactstrap';
import BodyPartOption from '../BodyPartOption/BodyPartOption';
import bodyPartData from '../../helpers/data/bodyPartData';
import 'firebase/auth';
import './Home.scss';

class Home extends React.Component {
  state = {
    bodyparts: [],
    dropdownOpen: false,
  }

  getBodyParts = () => {
    bodyPartData.getBodyParts().then((bodyparts) => this.setState({ bodyparts }))
      .catch((err) => console.error('could not get bodyparts', err));
  }

  componentDidMount() {
    this.getBodyParts();
    console.error(this.bodyparts);
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  filterStretches = (bodyPartId) => {
    console.error(bodyPartId);
    this.props.history.push(`/stretches?bodypartId=${bodyPartId}`);
  }

  render() {
    const bodyPartChoices = this.state.bodyparts.map((bodypart) => (
     <BodyPartOption key={bodypart.id} bodyPartOption={bodypart} filterStretches={this.filterStretches}/>
    ));
    return (
      <div className="Home col">
      <div id="homeHeader">
      <h1>Welcome to Stretch Goals!</h1>
      <h2>Where are you sore?</h2>
      </div>
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Choose Body Part
        </DropdownToggle>
        <DropdownMenu>
        {bodyPartChoices}
        </DropdownMenu>
      </ButtonDropdown>
      <Link className="btn btn-primary" to='/stretches'>View All Stretches</Link>
      </div>
    );
  }
}

export default Home;
