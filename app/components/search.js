import React, { Component } from 'react';

import { connect } from 'react-redux';
import C from '../constants';
import { reduxForm } from 'redux-form';
import actions from '../actions';
import { Button, Input } from 'react-bootstrap';

import History from './history';
import MyQuagga from './myQuagga';

class Search extends Component {
    constructor() {
		super();
	} 

    submitQuery(data) {
        this.props.startLoading();
        this.props.submitNewRecord(data);
        this.props.changePage('releases');
        //this.props.resetForm();
    }
    
	render() {
        const { fields: { recordKeyWord }, handleSubmit } = this.props;
        
		return (
			<section>
                <form className="searchForm" onSubmit={handleSubmit(this.submitQuery.bind(this))}>
            
                    <label htmlFor="recordKeyWord">
                        KEY WORDS:    
                    </label>  
                        
                    <Input type="text" id="recordKeyWord" placeholder="enter record's key words" {...recordKeyWord} bsStyle={recordKeyWord.touched && recordKeyWord.invalid ? 'error' : null} autoFocus autoComplete required/>
         
                    <Button type="submit" id="searchButton">SEARCH</Button>
                </form>
                
                <section id="searchByBarcodeWrapper">
                    <h6>- OR -</h6>
                    
                    <MyQuagga /> 
                </section>                    
                    
                <History />         
			</section>
            
		);
	}
}

const validate = values => {
    const errors = {};

    if (!values.recordKeyWord) {
        errors.recordKeyWord = 'Required field';
    }

    return errors;
};

const mapStateToProps = (appState) => {
	return { };
};

const mapDispatchToProps = (dispatch) => {
	return {
        submitNewRecord(data) { dispatch(actions.submitNewRecord(data)); },
        startLoading(){ dispatch(actions.startLoading()); },
        changePage(page) { dispatch(actions.changePage(page)); }
	};
};


Search = reduxForm({
    form: 'eventform',
    fields: ['recordKeyWord'],
    validate
}, mapStateToProps, mapDispatchToProps)(Search);

export default Search;
