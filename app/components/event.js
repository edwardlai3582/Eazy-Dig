import React, { Component } from 'react';
import C from '../constants';

import { Modal, ListGroup, ListGroupItem, Button, Glyphicon, Row, Col } from 'react-bootstrap';

class Event extends Component {
	constructor() {
		super();
        this.state = { showModal: false};
	}
     
    close() {
        this.setState({ showModal: false});
    }
    
    click(){
        this.setState({ showModal: true}); 
    }
    
    delete(){
        this.props.delete();
    }
    
    time(timestring){
        let res = "";
        let countNumber = 0;
        for (var i = 0; i < timestring.length; i++) {
            if(timestring[i]==="-"){
                res=res.concat("/");
            }
            else if(timestring[i]==="T"){
                res=res.concat(" ");    
            }
            else{
                res=res.concat(timestring[i]);    
            }
            if(timestring[i] >= '0' && timestring[i] <= '9'){
                countNumber++;    
            }
            if(countNumber === 12){
                break;
            }
        }
        return res;
    }
    
	render() {
		const p = this.props;

		return (
            <div className="eventWrapper">
            <ListGroup>
                <ListGroupItem className="eventTytle">
                    <Row className="show-grid">
                        <Col xs={10} md={10}><h4 className="eventName">{p.event.name}</h4> </Col>
                        <Col xs={2} md={2} className="deleteEventWrapper">
                            <Glyphicon glyph="remove-sign" className="deleteEvent" onClick={this.click.bind(this)} />
                        </Col>
                    </Row>
                    {p.event.type}
                </ListGroupItem>
                <ListGroupItem className="others">
                    <div className="otherskey">
                        Host:
                    </div>
                    <div>
                        {p.event.host}
                    </div>
                </ListGroupItem>
                <ListGroupItem className="others">
                    <div className="otherskey">
                        Start date/time:
                    </div>
                    <div>
                        {this.time(p.event.start)}
                    </div>
                </ListGroupItem>
                <ListGroupItem className="others">
                    <div className="otherskey">
                        End date/time:
                    </div>
                    <div>
                        {this.time(p.event.end)}
                    </div>
                </ListGroupItem>
                <ListGroupItem className="others">
                    <div className="otherskey">
                        Guest List:
                    </div>
                    <div>
                        {p.event.guest.replace(/,/g, ", ")}
                    </div>
                </ListGroupItem> 
                <ListGroupItem className="others">
                    <div className="otherskey">
                        Location:
                    </div>
                    <div>
                        {p.event.location}
                    </div>
                </ListGroupItem>      
                <ListGroupItem className={`others ${p.event.message==="" ? 'hide' : ''}`} >
                    <div className="otherskey">
                        Message:
                    </div>
                    <div>
                        {p.event.message}
                    </div>
                </ListGroupItem> 
            </ListGroup>
            <Modal show={this.state.showModal } onHide={this.close.bind(this)} >
                  <Modal.Body className="deleteEventBody">
                    <div className="deleteEventBodytext">
                    Do you want to delete Event: <strong> {p.event.name} </strong> ?
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close.bind(this)} >Cancel</Button>
                    <Button bsStyle="danger" onClick={this.delete.bind(this)} >Delete</Button>
                  </Modal.Footer>
            </Modal>
            </div>    
		);
	}
}

export default Event;
