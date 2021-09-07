import React from 'react';
import {
    Form, Row,Col,Button, Container     
    } from 'react-bootstrap'
    

class AddSubject extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            subcode:null,
            subname:null,

        }
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

    render() {
        return (<Container className="bg-info"><Form>
        <Row className="mb-3">
          
          <Form.Group as={Col} controlId="code">
            <Form.Label>Enter Subject statusCode</Form.Label>
            <Form.Control required type="code" placeholder="Enter SubCode" 
            onChange={(e) => this.setcode(e.target.value)}/>

          </Form.Group>
          <Form.Group as={Col} controlId="subname">
            <Form.Label>Enter Subject Name</Form.Label>
            <Form.Control required type="name" placeholder="Enter Subname" 
            onChange={(e) => this.setsubname(e.target.value)}/>

          </Form.Group>
          </Row>
          <Button variant="danger" type="submit">
    Add Subject
  </Button></Form></Container>
          )
    }
    
}

export default AddSubject;