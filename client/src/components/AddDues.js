import React from "react";
import {
    Form, Row,Col,Button, Container     
    } from 'react-bootstrap'
    
class AddDues extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            amount:0.0,
            reason:''
        }
        this.setAmount = this.setAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setReason = this.setReason.bind(this);
    }

    setAmount(amount){
        this.setState({
            amount : amount
        })
    }

    setReason(reason){
        this.setState({
            reason:reason
        })
    }

    handleSubmit(){
        //TODO: Handle submit to be completed
    }


    render() {
        return (
            <Container className="bg-info">
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Form.Group as={Col} controlId="code">
                            <Form.Label>Due to</Form.Label>
                            <Form.Control required type="code" placeholder="Student ID" value={this.props.match.params.id} disabled readOnly/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="dueamount">
                            <Form.Label>Enter Due Amount</Form.Label>
                            <Form.Control required 
                                type="number"
                                placeholder="Enter Due amount"
                                onChange={(e) => this.setAmount(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3" style={{width:'75%'}} controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Due Reason</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                onChange={(e) => this.setReason(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="danger" type="submit">
                         Add Subject
                    </Button>
                </Form>
            </Container>
          )
        
    }
     
}
export default AddDues;