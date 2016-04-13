import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { Image } from 'react-bootstrap';
import actions from '../actions';

class Whosampled extends Component {
    
	render() {
        
        const p = this.props.position;
        const w = this.props.whosampled.whosampled;
		let rows = [];
        
		if (p in w){            
            rows = w[p].map((sample) =>{
                return (
                    <li className="whosampledLi" >
                        <img src={sample.imgUrl} />
                        <article>
                            <p>{sample.sampleArtist}</p>
                            <p>{sample.sampleTitle}</p>
                        </article>
                    </li>
                );
            }); 
		}
        
        if(rows.length===0){
            rows='no sample found on WhoSampled';
        }
        
		return (
            <ul className={this.props.ui.showWhosampled[p] ? '' : 'hidden'}>
                { rows }
            </ul>  
		);
	}
}

const mapStateToProps = (appState) => {
	return { 
        whosampled: appState.whosampled,
        ui: appState.ui
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Whosampled);
