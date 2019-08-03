import React from 'react';
import {
  DropdownItem,
} from 'reactstrap';

class BodyPartOption extends React.Component {
  clickEvent = (e) => {
    e.preventDefault();
    this.props.filterStretches(this.props.bodyPartOption.id);
  }

  render() {
    const { bodyPartOption } = this.props;
    return (
     <DropdownItem onClick={this.clickEvent}>{bodyPartOption.name}</DropdownItem>
    );
  }
}

export default BodyPartOption;
