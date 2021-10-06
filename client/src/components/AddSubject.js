import React from 'react';
import {
    Form, Row,Col,Button, Container     
    } from 'react-bootstrap'
    
import axios from 'axios'
import config from '../config.json'
class AddSubject extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            subcode:null,
            subname:null,
            

        }
        this.setcode=this.setcode.bind(this)
        this.setsubname=this.setsubname.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    setcode(subcode)
    {
        this.setState({
            subcode:subcode,
        })
    }
    setsubname(subname)
    {
        this.setState({
            subname:subname,
        })
    }
     
    handleSubmit(event){
        event.preventDefault()
        const data = {
            subname:this.state.subname,
            subcode:this.state.subcode,
           
        }
    
    axios.post(`${config.API_URL}/add/subject`, data, {
        'Content-Type': 'application\json',
        'Access-Control-Allow-Origin': '*'
    }).then(response => {
        console.log(response);
        alert(response.data)
        window.location.reload()
    })
}

    render() {
        return (<Container className="bg-info"><Form onSubmit={this.handleSubmit}>
        <Row className="mb-3">
          
          <Form.Group as={Col} controlId="code">
            <Form.Label>Enter Subject statusCode</Form.Label>
            <Form.Control required type="code" placeholder="Enter SubCode" 
            onChange={(e) => this.setcode(e.target.value)}
            value={this.state.subcode}/>

          </Form.Group>
          <Form.Group as={Col} controlId="subname">
            <Form.Label>Enter Subject Name</Form.Label>
            <Form.Control required type="name" placeholder="Enter Subname" 
            onChange={(e) => this.setsubname(e.target.value)}
            value={this.state.subname}/>

          </Form.Group>
          </Row>
          <Button variant="danger" type="submit">
    Add Subject
  </Button></Form></Container>
          )
    }
    
}

export default AddSubject;