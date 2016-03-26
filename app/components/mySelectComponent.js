import React, { Component } from 'react';
import Select from 'react-select';

export default class MySelectComponent extends Component {
    render() {
        const { multi, placeholder, alert, value, onBlur, ...props} = this.props;
    
        return (
            <Select multi={multi} placeholder={placeholder} className={alert?"alert":""} allowCreate="true" value={value || ''} onBlur={() => onBlur(value)} {...props}/>      
        );                
    }
}
