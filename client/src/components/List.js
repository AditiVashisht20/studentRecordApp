import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Container, ListGroup,OverlayTrigger,Table,Tooltip } from 'react-bootstrap'
import config from '../config.json'


class List extends React.Component {

    constructor(props) {
        super(props);
        this.state={
          data:[]
        }
        
        }
        componentDidMount()
        {
          axios.get(`${config.API_URL}/list/${this.props.option}`)
          .then(res=>
            {
              const data=res.data;
              console.log('listdata,',data);
              this.setState({data:data})
            })
        }
        renderTooltio(props)
        {
          <Tooltip id="button-tooltip"{...props}>
            Simple tooltip
          </Tooltip>
        }
     render() {
       
      if(this.props.option=='students'){
                return (<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Roll Number</th>
      <th>First Name</th>
      <th>Mid Name</th>
      <th>Last Name</th>
      <th>DOB</th>
      <th>age</th>
      <th>Email</th>
      <th>Address</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {this.state.data.map(student=>{
      return (
        <tr>
          <td>{student.rollNumber}</td>
          <td>{student.fname}</td>
          <td>{student.midname}</td>
          <td>{student.lname}</td>
          <td>{new Date(student.dob).toLocaleDateString()} </td>
          <td>{student.age}</td>
          <td>{student.email}</td>
          <td>{student.address}</td>
          <td style={{columneWidth:'160px', padding:'10px'}}>
            {[{
              className:'fas fa-edit',
              text:'Edit Student',
              link:`/edit/student/${student.rollNumber}`
            },
            {
              className:'fas fa-pen',
              text:'Update Attendance',
              link:`/edit/attendance/${student.rollNumber}`

            },
            {
              className:'far fa-trash-alt',
              text:'Delete Student',
              link:`/delete/student/${student.rollNumber}`
            }]
          .map(ele=>{
            return(<OverlayTrigger
          placement="top"
              delay={{show:250,hide:400}}
              overlay={
                <Tooltip>
                  {ele.text}
                  </Tooltip>
              }
              >
                 <Link style={{ textDecoration: 'none',color:'#000' }} to={ele.link}>
                 <i className={ele.className}>&nbsp;&nbsp;</i>
                     </Link>
                      </OverlayTrigger>)
          })}
          </td>
           </tr>
          
      )
    })}
   
  </tbody>
  
</Table>
 )}
    
    else
    {
      return(<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Subject Name</th>
      <th>Subject Code</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {
      this.state.data.map(subjects=>{
        return(
          <tr>
            <td>{subjects.subname}</td>  
            <td>{subjects.subcode}</td> 
            <td style={{columneWidth:'160px', padding:'10px'}}>   
            {[{
              className:'fas fa-edit',
              text:'Edit Subject',
              link:`/edit/subject/${subjects.subcode}`
            },
            {
              className:'far fa-trash-alt',
              text:'Delete SUbject',
              link:`/delete/subject/${subjects.subcode}`
            }]
            .map(ele=>{
              return(<OverlayTrigger
            placement="top"
                delay={{show:250,hide:400}}
                overlay={
                  <Tooltip>
                    {ele.text}
                    </Tooltip>
                }
                >
                   <Link style={{ textDecoration: 'none',color:'#000' }} to={ele.link}>
                   <i className={ele.className}>&nbsp;&nbsp;</i>
                       </Link>
                        </OverlayTrigger>)
            })}
            </td>

            </tr>
        )
      })
    }
  </tbody>
  </Table>
       ) }
  }
  
     }
export default List;
  