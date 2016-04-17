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
                    <li key={sample.imgUrl}>
                        <img src={sample.imgUrl} alt={sample.sampleArtist+"'s "+sample.sampleTitle}/>
                        <dl>
                            <dd>{sample.sampleArtist}</dd>
                            <dd>{sample.sampleTitle}</dd>
                        </dl>
                    </li>
                );
            }); 
		}
        
        if(rows.length===0){
            rows=(<li>no sample found on WhoSampled</li>);
        }
        
		return (
            <section className="whosampledWrapper">
                <ul className={this.props.ui.showWhosampled[p] ? '' : 'hidden'}>
                    { rows }
                </ul>
            </section>
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
