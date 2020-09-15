import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
    }
  }

  // BEFORE REDUX
  // handleAddingNewTicketToList = (newTicket) => {
  //   const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
  //   this.setState({
  //     masterTicketList: newMasterTicketList,
  //     formVisibleOnPage: false
  //   });
  // }

  // WITH REDUX
  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    const action2 = {
      type: 'TOGGLE_FORM',
    }
    dispatch(action2);
    // this.setState({formVisibleOnPage: false});
  }

  // BEFORE REDUX
  // handleChangingSelectedTicket = (id) => {
  //   const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
  //   this.setState({selectedTicket: selectedTicket});
  // }

  // WITH REDUX
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({selectedTicket: selectedTicket
    });
  }

  // BEFORE REDUX
  // handleDeletingTicket = (id) => {
  //   const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
  //   this.setState({
  //     masterTicketList: newMasterTicketList,
  //     selectedTicket: null
  //   });
  // }

  // WITH REDUX
  handleDeletingTicket = (id) => {
    const{ dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id,
    }
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  // BEFORE REDUX
  // handleEditingTicketInList = (ticketToEdit) => {
  //   const editedMasterTicketList = this.state.masterTicketList
  //     .filter(ticket => ticket.id !== this.state.selectedTicket.id)
  //     .concat(ticketToEdit);
  //   this.setState({
  //     masterTicketList: editedMasterTicketList,
  //     editing: false,
  //     selectedTicket: null
  //   });
  // }

  // WITH REDUX
  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false, 
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = 
      <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      // BEFORE REDUX
      // currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      // WITH REDUX
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;