import React, { Component } from 'react';
import C from '../constants';

import { Image } from 'react-bootstrap';

class Release extends Component {
    
	render() {
		const p = this.props;
        let formats = '';
        let labels = '';
        for (let i = 0; i < p.format.length; i++) {
          formats = formats.concat(p.format[i]);
          if(i !== p.format.length-1){
            formats = formats.concat(' / ');    
          }    
        }
        for (let i = 0; i < p.label.length; i++) {
          labels = labels.concat(p.label[i]);
          if(i !== p.label.length-1){
            labels = labels.concat(' / ');    
          }    
        }
        
		return (
            <article className="releaseWrapper">
                <img src={p.thumb} alt={p.title} />
                <ul>
                    <li className="releaseTitle">{p.title}</li>
                    <li> { formats } </li>
                    <li> { p.catno } </li>
                    <li> { p.country } </li>
                    <li> { p.year } </li>
                    <li> { labels } </li>
                    <li> { p.genre } </li>
                </ul>
            </article>   
		);
	}
}

export default Release;
