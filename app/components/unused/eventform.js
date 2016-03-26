import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { routeActions } from 'react-router-redux';
import { Button, Modal, Input } from 'react-bootstrap';

import actions from '../actions';

import Fake from './fake';

window.fml=null;

class Eventform extends Component {
    constructor() {
		super();
        this.handleChange = this.handleChange.bind(this);
        fml = this.handleChange.bind(this);
	}    

    
    close() {
        this.props.hideEventModal();
        this.props.resetForm();
    }
    
    addEvent(data) {
        console.log(data);
        this.props.submitNewEvent(data);
    }
    
    handleChange(value) {
        this.props.fields.eventLocation.onChange(value);
    }
    
    render() {
        const { fields: { eventName, eventType, eventHost, eventStartDatetime, eventEndDatetime, eventLocation, eventOptionalmessage }, handleSubmit } = this.props;
        
        return (
            <Modal show={this.props.showEventform} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title className="signupformTitle">New Event</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className="signupformForm" onSubmit={handleSubmit(this.addEvent.bind(this))}>
                    <div>
                        <label><div className="labelT">Name</div>
                        <Input type="text" placeholder="event Name" {...eventName} autoFocus="true"/>
                        </label>
                    </div>
                    <div>
                        <label><div className="labelT">Type</div>
                        <Input list="browsers" type="text" placeholder="event Type" {...eventType}/>
                        <datalist id="browsers">
                          <option value="birthday party"/>
                          <option value="conference talk"/>  
                          <option value="wedding"/>        
                        </datalist>
                        </label>
                    </div>
                    <div>
                        <label><div className="labelT">Host</div>
                        <Input type="text" placeholder="event Host" {...eventHost}/>
                        </label>
                    </div>
                    <div>
                        <label><div className="labelT">Start date and time</div>
                        <Input type="datetime-local" placeholder="" {...eventStartDatetime}/>
                        </label>
                    </div>
                    <div>
                        <label><div className="labelT">End date and time</div>
                        <Input type="datetime-local" placeholder="" {...eventEndDatetime}/>
                        </label>
                    </div>
                    <div>
                        <label><div className="labelT">Location</div>
                            <Input id="autocomplete" placeholder="Enter your address" type="text" {...eventLocation}/>
                            <Fake />
                        </label>
                    </div>
                    
                    <div>
                        <label><div className="labelT">Optional message</div>
                        <Input type="textarea" placeholder="Optional message" {...eventOptionalmessage}/>
                        </label>            
                    </div>        
     
                    <div className="signupformSubmitWrapper">
                        <Button type="submit">Submit</Button>    
                    </div>
                </form>       
              </Modal.Body> 
            </Modal>  
        );
    }
}

/*
const validate = values => {
  const errors = {};

  if (!values.signupemail) {
    errors.signupemail = 'Required field';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.signupemail)) {
    errors.signupemail = 'Invalid email address';
  }
    
  if (!values.signuppassword) {
    errors.signuppassword = 'Required field';
  } else if (values.signuppassword.length <3) {
    errors.signuppassword = 'Must be 3 characters or more';
  } 
    
  if (!values.signuplastName) {
    errors.signuplastName = 'Required field';
  }      
    
  return errors;
};
*/

function mapDispatchToProps (dispatch) {
    return {
        showEventModal(){dispatch(actions.showEventModal())},
        hideEventModal(){dispatch(actions.hideEventModal())},
        submitNewEvent(data) { dispatch(actions.submitNewEvent(data)); }
    };
}

function mapStateToProps (appState) {
	return {
		showEventform: appState.showModal.showEventform
	};
};

Eventform = reduxForm({
    form: 'eventform',
    fields: ['eventName', 'eventType', 'eventHost', 'eventStartDatetime', 'eventEndDatetime', 'eventLocation', 'eventOptionalmessage']
}, mapStateToProps, mapDispatchToProps)(Eventform);

export default Eventform;
