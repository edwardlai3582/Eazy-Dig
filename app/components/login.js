import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux';
import { Button, Modal, Input, ButtonInput, Alert } from 'react-bootstrap';

import Signupform from './signupform';
import actions from '../actions';

class Login extends Component {

    open() {
        this.props.showSignupModal();
        this.props.dismissFeedback();
        //this.props.resetForm();
    }
    
    signIn(data) {
        this.props.attemptLogin(data);
    }

    showAlert(){
        if(typeof this.props.fields.email.value!=="undefined" || typeof this.props.fields.password.value!=="undefined" ){
            return(
                <div></div>
            );            
        }
        else{
            return(
                <div className="signinAlert">
                    { this.props.feedback.msg }
                </div> 
            );
        }
    }
    
    render() {
        const { fields: { email, password }, handleSubmit } = this.props;
        
        return (
            <div className="loginWrapper">
            <h1 className="loginTitle">
                MeetUp Planner
            </h1>
            <form autocomplete="on" onSubmit={handleSubmit(this.signIn.bind(this))} >
            <div>
                <label for="email">
                <Input type="email" id="email" placeholder="enter your email" bsStyle={email.touched && email.invalid ? 'error' : null} {...email} autoFocus />
                </label>
            </div>
            <div className="signinemailAlert">
                {email.touched && email.error? email.error : ""}
            </div>  
                
            <div>
                <label for="password">
                <Input type="password" id="password" placeholder="enter your password" bsStyle={password.touched && password.invalid ? 'error' : null} {...password} />
                </label>
            </div>
            <div className="signinAlert">
                {password.touched && password.error && <div dangerouslySetInnerHTML={{__html: password.error}}></div>}
            </div>     
                
            { this.showAlert() }

            <ButtonInput className="loginB" type="submit">Login</ButtonInput>
            </form>
            
            <ButtonInput className="signUpB" onClick={this.open.bind(this)} >
              Sign up
            </ButtonInput>
          
            <Signupform loginemail={email.value} />
            </div>
        );
    }
    
}

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required field';
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required field';
    } 
    else{
        if (values.password.length < 8) {
            errors.password = 'Must have at least 8 characters or more';   
        }
        if (values.password.length > 100) {
            if(!errors.password) {
                errors.password = 'No more the 100 characters';
            }
            else{
                errors.password = errors.password + '<br/>'+ 'No more the 100 characters';
            } 
        }
        if (!/[!@#$%^&+-]+/i.test(values.password)) {
            if(!errors.password) {
                errors.password = 'Must have at least 1 special character ( !, @, #, $, %, ^, &, +, -)';
            }
            else{
                errors.password = errors.password + '<br/>'+ 'Must have at least 1 special character ( !, @, #, $, %, ^, &, +, -)';
            } 
        }
        if (!/\d+/i.test(values.password)) {
            if(!errors.password) {
                errors.password = 'Must have at least 1 number';
            }
            else{
                errors.password = errors.password + '<br/>'+ 'Must have at least 1 number';
            } 
        }
        if (!/[A-Z]+/.test(values.password)) {
            if(!errors.password) {
                errors.password = 'Must have at least 1 uppercase letter';
            }
            else{
                errors.password = errors.password + '<br/>'+ 'Must have at least 1 uppercase letter';
            } 
        }
        if (!/[a-z]+/.test(values.password)) {
            if(!errors.password) {
                errors.password = 'Must have at least 1 lowercase letter';
            }
            else{
                errors.password = errors.password + '<br/>'+ 'Must have at least 1 lowercase letter';
            } 
        }    
    }

    return errors;
};

function mapDispatchToProps (dispatch) {
    return {
        showSignupModal() {dispatch(actions.showSignupModal())},
        hideSignupModal() {dispatch(actions.hideSignupModal())},
        attemptLogin(data) { dispatch(actions.attemptLogin(data))},
        dismissFeedback() {dispatch(actions.dismissFeedback())}
    };
}

function mapStateToProps (appState) {
	return {
        feedback: appState.feedback
	};
};

Login = reduxForm({
    form: 'register',
    fields: ['email', 'password'],
    validate
}, mapStateToProps, mapDispatchToProps)(Login);

export default Login;
