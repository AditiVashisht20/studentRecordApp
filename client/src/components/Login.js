import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import config from '../config.json'
import {
    Row,Col
} from 'react-bootstrap'

import "./Login.css";

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    setEmail(email) {
        this.setState({
            email: email
        })
    }

    setPassword(pass) {
        this.setState({
            password: pass
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Submitted');
        console.log(config)

        const data = {
            username:this.state.email,
            password:this.state.password
        }

        axios.post(`${config.API_URL}/login`,data,{
            'Content-Type':'application\json',
            'Access-Control-Allow-Origin':'*'
        }).then(response=>{
            if(response){
                if (response.data.statusCode == 200){
                    this.props.setLoggedIn(true);
                }else{
                    alert(response.data.data);
                }
            }else{
                alert("Something went wrong! \nPlease try again some time.")
            }
        })


    }
    render(){
        return (
            <div className="Login" className="bg-info">
                <Form onSubmit={this.handleSubmit}>

                   <Row className="sm-3">
                       <Form.Group as={Col} controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            placeholder="Enter Your username"
                            type="text"
                            value={this.state.email}
                            onChange={(e) => this.setEmail(e.target.value)}
                        />
                    </Form.Group></Row>
                    <Row className="sm-3">
                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Your Password"
                            value={this.state.password}
                            onChange={(e) => this.setPassword(e.target.value)}
                        />
                         </Form.Group></Row>
                    <Button block size="lg" type="submit" disabled={!this.validateForm()}>
                            Login
                    </Button>
                </Form>
            </div>
            
        );
    }
}