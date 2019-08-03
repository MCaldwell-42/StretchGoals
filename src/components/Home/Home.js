import React from 'react';
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
    bodyPartData.getBodyParts().then(bodyparts => this.setState({ bodyparts }))
      .catch(err => console.error('could not get bodyparts', err));
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
    const bodyPartChoices = this.state.bodyparts.map(bodypart => (
     <BodyPartOption key={bodypart.id} bodyPartOption={bodypart} filterStretches={this.filterStretches}/>
    ));
    return (
      <div className="Home col">
      <h1>Where are you sore?</h1>
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Choose Body Part
        </DropdownToggle>
        <DropdownMenu>
        {bodyPartChoices}
        </DropdownMenu>
      </ButtonDropdown>
      </div>
    );
  }
}

export default Home;
