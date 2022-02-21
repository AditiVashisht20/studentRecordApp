import React from "react";
import {
    Form, Row, Col, Button, Container
} from 'react-bootstrap'
import axios from "axios";
import config from '../config.json'

class AddMarks extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            id: this.props.match.params.id,
            rollNumber: this.props.match.params.id,          

        }
       
        this.getData = this.getData.bind(this);
       this.getData(this.props.match.params.id);
    }
    async getData(id){
        await axios.get(`${config.API_URL}/list/student/${id}`).then(response => {
            this.setState({
                student_data : response.data || '',
               // label:'Update'
            })            
        })
    }


    render() {
        if(this.state.student_data)
        {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Form.Group as={Col} controlId="code">
                            <Form.Label>Roll Number</Form.Label>
                            <Form.Control required type="code" placeholder="Student Roll Number" value={this.state.rollNumber} disabled readOnly />
                        </Form.Group>
                        <Form.Group as={Col} controlId="marks">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required
                                type="text"
                                placeholder="Enter Marks"
                                value={this.state.student_data.fname}
                                 disabled readOnly />
                        </Form.Group>
                    </Row>
                    <Row>
                      <Form.Control as="Select">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                    </Form.Control>
                    </Row>
               
        
                        <Form.Group as={Col} controlId="marks">
                            <Form.Label> Marks</Form.Label>
                            <Form.Control required type="marks" placeholder="Enter marks" />
                        </Form.Group>
                    
                    <Button variant="danger" type="submit">
                         Add Marks
                    </Button>
                </Form>
            </Container>
        )


          }
               else
               {
                      return <h1>Loading</h1>
               }
    }
}

export default AddMarks;