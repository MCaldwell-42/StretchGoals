import React from 'react';
import {
  DropdownItem,
} from 'reactstrap';
import './RoutineOption.scss';

class RoutineOption extends React.Component {
  clickEvent = (e) => {
    e.preventDefault();
    this.props.addMe(this.props.routineOption.id);
  }

  render() {
    const { routineOption } = this.props;
    return (
     <DropdownItem onClick={this.clickEvent}>{routineOption.name}</DropdownItem>
    );
  }
}

export default RoutineOption;
