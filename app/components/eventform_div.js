import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux';
import { Button, Modal, Input } from 'react-bootstrap';
import actions from '../actions';
import MySelectComponent from './mySelectComponent';

window.eventLocation=null;

class Eventform extends Component {
    
    logChange(val) {
    console.log("Selected: " + val);
        this.props.fields.eventType.value=val;
    }
    
    constructor() {
		super();
        this.handleChange = this.handleChange.bind(this);
        this.state = { 
            typeOptions: [
                { value: 'birthday party', label: 'birthday party' },
                { value: 'conference talk', label: 'conference talk' },
                { value: 'wedding', label: 'wedding' }
            ],
            guestOptions: [
                { value: 'Pete Rock', label: 'Pete Rock' },
                { value: 'J Dilla', label: 'J Dilla' },
                { value: 'Sean Price', label: 'Sean Price' }
            ],
            landscape: "labelbasic landscape"
        };
	}    
    
    componentDidMount(){
        eventLocation = new google.maps.places.Autocomplete((document.getElementById('eventLocation')));
        eventLocation.addListener('place_changed', ()=>{
            this.handleChange(eventLocation.getPlace().formatted_address); 
        });
        window.addEventListener('resize', this.handleResize.bind(this));
        if(window.innerWidth>window.innerHeight){
            this.setState({ landscape: "labelbasic landscape" });    
        }
        else{
            this.setState({ landscape: "labelbasic" });    
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props.auth.currently !== 'LOGGED_IN'){
            this.props.goSomewhere('/');
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }
    
    handleResize(e) {
        if(window.innerWidth>window.innerHeight){
            this.setState({ landscape: "labelbasic landscape" });    
        }
        else{
            this.setState({ landscape: "labelbasic" });    
        }
    }
    
    cancel() {
        setTimeout(window.scrollTo(0,0),100);
        this.props.goSomewhere('/');
        this.props.resetForm();
    }
    
    addEvent(data) {
        this.props.submitNewEvent(data);
        this.props.goSomewhere('/');
        this.props.resetForm();
    }
    
    handleChange(value) {
        this.props.fields.eventLocation.onChange(value);
    }
    
    render() {
        const { fields: { eventName, eventType, eventHost, eventStartDatetime, eventEndDatetime, eventGuestlist, eventLocation, eventOptionalmessage }, handleSubmit } = this.props;
        
        return (
            <div className="eventformFormWrapper">
                <div className="eventformFormTitle">Create New Event</div>
                <form className="eventformForm" autocomplete="on" onSubmit={handleSubmit(this.addEvent.bind(this))}>

                    <label for="eventName" className={this.state.landscape}> 
                        <div className="labelTitle">Name</div>
                        <div className="labelInput">
                            <Input type="text" id="eventName" placeholder="enter event name" bsStyle={eventName.touched && eventName.invalid ? 'error' : null} {...eventName} autoFocus />
                        </div>    
                    </label>         

                    {eventName.touched && eventName.error && <div className="signupAlert">{eventName.error}</div>}    

                    <label for="eventType" className={this.state.landscape}> 
                        <div className="labelTitle">Type</div>
                        <div className="labelInput">
                            <MySelectComponent id="eventType" {...eventType} multi={false} alert={eventType.touched && eventType.invalid} options={this.state.typeOptions} placeholder="enter event type"/>
                        </div>    
                    </label> 

                    {eventType.touched && eventType.error && <div className="signupAlert">{eventType.error}</div>} 
                    
                    <label for="eventHost" className={this.state.landscape}> 
                        <div className="labelTitle">Host </div>
                        <div className="labelInput">
                            <Input type="text" id="eventHost" placeholder="enter event host" bsStyle={eventHost.touched && eventHost.invalid ? 'error' : null} {...eventHost}/>
                        </div>    
                    </label> 

                    {eventHost.touched && eventHost.error && <div className="signupAlert">{eventHost.error}</div>}    

                    <label for="eventStartDatetime" className={this.state.landscape}> 
                        <div className="labelTitle">Start date/time</div>
                        <div className="labelInput">
                            <Input type="datetime-local" id="eventStartDatetime" placeholder="MM/dd/yyyy hh:mm" bsStyle={eventStartDatetime.touched && eventStartDatetime.invalid ? 'error' : null} {...eventStartDatetime}/>
                        </div>    
                    </label> 

                    {eventStartDatetime.touched && eventStartDatetime.error && <div className="signupAlert">{eventStartDatetime.error}</div>}     

                    <label for="eventEndDatetime" className={this.state.landscape}> 
                        <div className="labelTitle">End date/time</div>
                        <div className="labelInput">
                            <Input type="datetime-local" id="eventEndDatetime" placeholder="MM/dd/yyyy hh:mm" bsStyle={eventEndDatetime.touched && eventEndDatetime.invalid ? 'error' : null} {...eventEndDatetime}/>
                        </div>    
                    </label> 

                    {eventEndDatetime.touched && eventEndDatetime.error && <div className="signupAlert">{eventEndDatetime.error}</div>}     

                    <label for="eventGuestlist" className={this.state.landscape}> 
                        <div className="labelTitle">Guest list</div>
                        <div className="labelInput">
                            <MySelectComponent multi={true} id="eventGuestlist" placeholder="enter guest list" {...eventGuestlist} alert={eventGuestlist.touched && eventGuestlist.invalid} options={this.state.guestOptions}/>
                        </div>    
                    </label> 

                    {eventGuestlist.touched && eventGuestlist.error && <div className="signupAlert">{eventGuestlist.error}</div>} 

                    <label for="eventLocation" className={this.state.landscape}> 
                        <div className="labelTitle">Location</div>
                        <div className="labelInput">
                            <Input id="eventLocation" placeholder="enter event address" bsStyle={eventLocation.touched && eventLocation.invalid ? 'error' : null} type="text" {...eventLocation}/>
                        </div>    
                    </label> 

                    {eventLocation.touched && eventLocation.error && <div className="signupAlert">{eventLocation.error}</div>}                                   

                    <label for="eventOptionalmessage" className={this.state.landscape}> 
                        <div className="labelTitle">Message (optional)</div>
                        <div className="labelInput">
                            <Input type="textarea" id="eventOptionalmessage" placeholder="enter optional message" {...eventOptionalmessage}/>
                        </div>    
                    </label> 

                    <div className="eventformSubmitWrapper">
                        <Button bsStyle="warning" onClick={this.cancel.bind(this)} onTouchEnd={this.cancel.bind(this)} >
                            Cancel
                        </Button>
                        <span  className="betweenTwoB"></span>
                        <Button type="submit">Submit</Button> 
                    </div>
                </form>   
            </div>  
        );
    }
}

const validate = values => {
    const errors = {};
    const isFirefoxOrIe = (typeof InstallTrigger !== 'undefined') || (false || !!document.documentMode);

    if (!values.eventName) {
        errors.eventName = 'Required field';
    }

    if (!values.eventType) {
        errors.eventType = 'Required field';
    }

    if (!values.eventHost) {
        errors.eventHost = 'Required field';
    }

    if (!values.eventStartDatetime) {
        errors.eventStartDatetime = 'Required field';
    } 
    else if ( isFirefoxOrIe ) {
        if(!/^([0][1-9]|[1][0-2])\/([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/[1-2][0-9][0-9][0-9]\s([0-1][0-9]|[2][0-3]):([0-5][0-9])$/i.test(values.eventStartDatetime)){
            errors.eventStartDatetime = 'Invalid time format';      
        } 
        else {
            let day, A= values.eventStartDatetime.match(/[1-9][\d]*/g);
            day= new Date(A[2], --A[0], A[1]);
            if(!(day.getMonth()== A[0] && day.getDate()== A[1])){
                errors.eventStartDatetime = 'Invalid time format';
            } 
        }
    }

    if (!values.eventEndDatetime) {
        errors.eventEndDatetime = 'Required field';
    } 
    else if ( isFirefoxOrIe ) {
        if(!/^([0][1-9]|[1][0-2])\/([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/[1-2][0-9][0-9][0-9]\s([0-1][0-9]|[2][0-3]):([0-5][0-9])$/i.test(values.eventEndDatetime)){
            errors.eventEndDatetime = 'Invalid time format';      
        } 
        else {
            let day, A= values.eventEndDatetime.match(/[1-9][\d]*/g);
            day= new Date(A[2], --A[0], A[1]);
            if(!(day.getMonth()== A[0] && day.getDate()== A[1])){
                errors.eventEndDatetime = 'Invalid time format';
            } 
        }
    } 

    if ( new Date(values.eventStartDatetime) >= new Date(values.eventEndDatetime) ) {
        errors.eventEndDatetime = 'End date should be after start date';     
    }     
    
    if (!values.eventGuestlist) {
        errors.eventGuestlist = 'Required field';
    }
    
    if (!values.eventLocation) {
        errors.eventLocation = 'Required field';
    } 

    return errors;
};


function mapDispatchToProps (dispatch) {
    return {
        submitNewEvent(data) { dispatch(actions.submitNewEvent(data)); },
        goSomewhere(url) { dispatch(routeActions.push(url)); },
    };
}

function mapStateToProps (appState) {
	return {
		showEventform: appState.showModal.showEventform,
        auth: appState.auth
	};
};

Eventform = reduxForm({
    form: 'eventform',
    fields: ['eventName', 'eventType', 'eventHost', 'eventStartDatetime', 'eventEndDatetime', 'eventGuestlist', 'eventLocation', 'eventOptionalmessage'],
    validate
}, mapStateToProps, mapDispatchToProps)(Eventform);

export default Eventform;

 
 
 
 
 
 