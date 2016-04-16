
import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { Modal, Button } from 'react-bootstrap';
import Quagga from 'quagga';
//import FileInput from 'react-file-input';

import actions from '../actions';

class MyQuagga extends Component {
    
    toggleModal(message){
        this.props.toggleQuaggaModal(message);
    }

    submitBarcode(barcode) {
        this.props.startLoading();
        let data = {};
        data.recordKeyWord= barcode.substring(1);
        this.props.submitNewRecord(data);
        this.props.changePage('releases');
    }
    
    
    fileChange(event){
        console.log('Selected file:', event.target.files[0].type);
        
        if(event.target.files[0].type.indexOf('image')===-1){
            this.toggleModal("not image");
            return;
        }
        
        let state= {
            decoder: {
                readers: ["ean_reader"]
            },
            locate: true,
            src: URL.createObjectURL(event.target.files[0])
        };
        
        Quagga.decodeSingle(state, function(result){
            if(result){
                if(result.codeResult) {
                    console.log("result", result.codeResult.code);
                    this.submitBarcode(result.codeResult.code);
                }     
            }
            else {
                console.log("not detected");
                this.toggleModal("can't detect barcode");
            }
        }.bind(this));
    }
    
	render() {
        
        return(
            <section  className="quaggaWrapper">
            
                <input type="file" name="barcode_picture" id="barcode_picture" className="inputfile" accept="image/*;capture=camera" onChange={this.fileChange.bind(this)} />
                <label htmlFor="barcode_picture">SEARCH BY BARCODE</label>  
                
                <Modal show={this.props.ui.showQuaggaModal} onHide={this.toggleModal.bind(this,'')}>
                    <Modal.Header closeButton>
                    </Modal.Header>        
                    <Modal.Body id="quaggaModalBody">
                        { this.props.ui.showQuaggaModalMessage }
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.toggleModal.bind(this,'')}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </section>
        );    
	}
}

const mapStateToProps = (appState) => {
	return { 
        ui: appState.ui
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        submitNewRecord(data) { dispatch(actions.submitNewRecord(data)); },
        startLoading(){ dispatch(actions.startLoading()); },
        changePage(page) { dispatch(actions.changePage(page)); },
        toggleQuaggaModal(message) { dispatch(actions.toggleQuaggaModal(message)); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyQuagga);
