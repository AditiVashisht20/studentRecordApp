import React from 'react';
import {
Form, Row,Col,Button, Container     
} from 'react-bootstrap'


class AddStudent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        
        return (<Container className="bg-primary"><Form>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="name" placeholder="Enter name" />
    </Form.Group>

    <Form.Group as={Col} controlId="mname">
      <Form.Label>Mid Name</Form.Label>
      <Form.Control type="mname" placeholder="Enter Your middle name" />
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="lname">
    <Form.Label>Last name</Form.Label>
    <Form.Control type="name" placeholder="Enter your Last name" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="age">
    <Form.Label>Age</Form.Label>
    <Form.Control type="age" placeholder="Enter Your Age" />
  </Form.Group>

  <Row className="mb-3">
  <Form.Group className="mb-3" controlId="dob">
    <Form.Label>DOB</Form.Label>
    <Form.Control type="dob" placeholder=" YYYY-MM-DD" />
  </Form.Group>
  


    <Form.Group as={Col} controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter Your email"/>
    </Form.Group>
  </Row>

 


  <Button variant="warning" type="submit">
    Add Student
  </Button>
</Form></Container>)


    }
}

export default AddStudent;