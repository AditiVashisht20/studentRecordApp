import React from "react";
import {
    Form, Row, Col, Button, Container
} from 'react-bootstrap'
import axios from "axios";
import config from '../config.json'
import Select from 'react-select';

class AddMarks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            rollNumber: this.props.match.params.id,  
            subcode:null,  
            marks:0,   
        }       
        this.getData = this.getData.bind(this);
       this.getData(this.props.match.params.id);
       this.setMarks=this.setMarks.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
       this.handleChange=this.handleChange.bind(this);
    
    }
    setMarks(marks)
    {
        this.setState({
            marks:marks,
        })
    }
    async getData(id){
        await axios.get(`${config.API_URL}/list/student/${id}`).then(response => {
            console.log(response.data.subjects);
            this.setState({
                student_data : response.data || '',
                subjects: response.data.subjects                
            })            
        })
        
    }
    handleSubmit(event){
        event.preventDefault();
        const data = {
            subcode:this.state.subcode,
            rollNumber:parseInt(this.state.rollNumber),  
            marks:parseInt(this.state.marks), 
        }
        console.log(data);
         
    axios.post(`${config.API_URL}/add/marks/${this.state.rollNumber}`, data, {
        'Content-Type': 'application\json',
        'Access-Control-Allow-Origin': '*'
        }).then(response => {
            console.log(response);
            alert(response.data)
            //window.location = '/'
        })
    }
    
    handleChange(e)
    {
      //  console.log(e.target.value)
        this.setState({
            subcode:e.target.value,
        })
    }


    render() {
        if(this.state.student_data)
        {
        return (
            <Container className="bg-success">
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
                      <Form.Control as="select" onChange={this.handleChange}>
                          <option disabled readOnly selected>Select the subject </option> 
                            {   
                                this.state.subjects.map(ele=>{
                                   // console.log(ele);
                                    
                                    return (<option key={ele.value} value={ele.value}>{ele.label}</option>)
                                })
                            /* <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option> */
                            }

                    </Form.Control>         
                          <Form.Group as={Col} controlId="marks">
                            <Form.Label> Marks</Form.Label>
                        <Form.Control required type="marks" placeholder="Enter marks" onChange={(e) => this.setMarks(e.target.value)}
      value={this.state.marks}/>
                        </Form.Group>
                        </Row>
                    
                    <Button variant="warning" type="submit">
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