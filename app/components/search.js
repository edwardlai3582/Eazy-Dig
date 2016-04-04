import React, { Component } from 'react';

import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import actions from '../actions';
import { Button, Input } from 'react-bootstrap';

class Search extends Component {
    constructor() {
		super();
	} 

    submitQuery(data) {
        this.props.submitNewRecord(data);
        this.props.goSomewhere('/releases');
        //this.props.resetForm();
    }
    
	render() {
        const { fields: { recordQuery }, handleSubmit } = this.props;
        
		return (
			<div>
				SEARCH
                <form className="eventformForm" autocomplete="on" onSubmit={handleSubmit(this.submitQuery.bind(this))}>
            
                    <label for="recordQuery"> 
                        <div className="labelTitle">Query</div>
                        <div className="labelInput">
                            <Input type="text" id="recordQuery" placeholder="enter record Query" {...recordQuery} autoFocus />
                        </div>    
                    </label>         

                    {recordQuery.touched && recordQuery.error && <div className="signupAlert">{recordQuery.error}</div>}
                    
                    <Button type="submit">Submit</Button>
                </form> 
			</div>
            
		);
	}
}

const validate = values => {
    const errors = {};

    if (!values.recordQuery) {
        //errors.recordQuery = 'Required field';
    }

    return errors;
};

const mapStateToProps = (appState) => {
	return { };
};

const mapDispatchToProps = (dispatch) => {
	return {
        submitNewRecord(data) { dispatch(actions.submitNewRecord(data)); },
        goSomewhere(url) { dispatch(routeActions.push(url)); },
	};
};

//export default connect(mapStateToProps, mapDispatchToProps)(Search);


Search = reduxForm({
    form: 'eventform',
    fields: ['recordQuery'],
    validate
}, mapStateToProps, mapDispatchToProps)(Search);

export default Search;
