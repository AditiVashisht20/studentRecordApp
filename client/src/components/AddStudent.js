import React from 'react';
import {
Form, Row,Col,Button, Container     
} from 'react-bootstrap'


class AddStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            fname:null,
            mname:null,
            lname:null,
            dob:null,
            email:null,
            address:null,
            
        }
        this.setFirstName=this.setFirstName.bind()
        this.setMidName=this.setMidName.bind()
        this.setLname=this.setLname.bind()
        this.setage=this.setage.bind()
        this.setDob=this.setDob.bind()
        this.setemail=this.setemail.bind()
        this.setadd=this.setadd.bind()

    }
    setFirstName(fname)
    {
        this.setState({
            fname:fname,
        })
    }
    setMidName(mname)
    {
        this.setState({
            mname:mname,
        })
    }
    setLname(lname)
    {
        this.setState({
            lname:lname
        })
    }
    setage(age)
    {
        this.setState({
            age:age
        })
    }
    setDob(dob)
    {
        this.setState({
            dob:dob
        })
    }
    setemail(email)
    {
        this.setState({
            email:email
        })
    }
    setadd(address)
    {
        this.setState({
            address:address
        })
    }
    render() {
        
        return (<Container className="bg-info"><Form>
  <Row className="mb-3">
    
    <Form.Group as={Col} controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control required type="name" placeholder="Enter name" 
      onChange={(e) => this.setFirstName(e.target.value)}/>
    </Form.Group>

    <Form.Group as={Col} controlId="mname">
      <Form.Label>Mid Name</Form.Label>
      <Form.Control type="mname" placeholder="Enter Your middle name"
      onChange={(e) => this.setMidName(e.target.value)} />
    </Form.Group>
    <Form.Group as={Col} controlId="lname">
    <Form.Label>Last name</Form.Label>
    <Form.Control required type="name" placeholder="Enter your Last name" 
    onChange={(e) => this.setLName(e.target.value)}/>
  </Form.Group>
  </Row>
<Row className="mb-3">
  <Form.Group as={Col} className="mb-3" controlId="age">
    <Form.Label>Age</Form.Label>
    <Form.Control type="age" placeholder="Enter Your Age" 
    onChange={(e) => this.setage(e.target.value)}/>
  </Form.Group>
  <Form.Group as={Col}controlId="dob">
    <Form.Label>DOB</Form.Label>
    <Form.Control required type="dob" placeholder=" YYYY-MM-DD"
    onChange={(e) => this.setDob(e.target.value)} />
  </Form.Group>
  </Row>

  <Row className="mb-3">
 <Form.Group as={Col} controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control required type="email" placeholder="Enter Your email"
      onChange={(e) => this.setemail(e.target.value)}/>
    </Form.Group>
  </Row>
  <Row className="mb-3">
 <Form.Group as={Col} controlId="Address">
      <Form.Label>Address</Form.Label>
      <Form.Control required type="add" placeholder="Enter Your Address"
      onChange={(e) => this.setadd(e.target.value)}/>
    </Form.Group>
  </Row>
 <Button variant="danger" type="submit">
    Add Student
  </Button>
</Form></Container>)


    }
}

export default AddStudent;