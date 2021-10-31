import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


class EditDues extends React.Component{

    constructor(props){
        super(props);
    }
    

    render(){
        return (
            <Link to={`/add/dues/${this.props.match.params.id}`}>
                <Button variant="primary">Add dues</Button>
            </Link>
        )
    }
}
export default EditDues;

