import React, { Component } from 'react'
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const FormNew = styled.div`
 width: 500px;
 margin: 0 auto;
 border: 1px solid white;
 padding: 20px;
 background: #454d55;
 position: fixed;
 left: 40%;
 bottom: 30%;
 z-index: 400;
 border-radius: 5px;
 box-shadow: 0px 0px 0px 3px rgba(63,63,63,0.75);
 display: ${props => props.isEdit ? 'block' : 'none'};
`;

export default class Brochure extends Component {
 constructor(props) {
  super(props);
  this.state = {
    isEdit: false,
    title: this.props.brochure.title,
    text: this.props.brochure.text
  }
 }
  change = (e) => {
   const {name, value} = e.target;
   this.setState({
     [name] : value
   })
  }

 updateBrochure = async (e) => {
  e.preventDefault();
  const id = this.props.brochure.id;
  const form = {
   title: this.state.title,
   text: this.state.text
  }
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:8000/api/brochures/${id}`, {
     method: 'PUT',
     body: JSON.stringify(
      form
     ),
     headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
     }
    })
    const result = await response.json();
    if(!result){
      console.log('error')
    } else {
      this.props.fetchBrochure();
      this.setState({isEdit: false});
    }
    
  } catch(err) {
   console.log(err);
  }
  
 }


 render() {
  return(
    <>
    <tr>
      <td>{this.props.index + 1}</td>
      <td>{this.props.brochure.title}</td>
      <td>{this.props.brochure.text}</td>
      <td style={{cursor: 'pointer'}} onClick={() => this.setState({isEdit: true})} >Edit</td>
      <td style={{cursor: 'pointer'}} onClick={() => this.props.handleDelete(this.props.brochure.id)} >Delete</td>
    </tr>
    <FormNew isEdit={this.state.isEdit}>
        <Form onSubmit={(e) => this.updateBrochure(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{color: '#fff', fontSize: '18px'}}>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{color: '#fff', fontSize: '18px'}}>Text</Form.Label>
            <Form.Control as="textarea" rows="3" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} />
          </Form.Group>

          <Button variant="dark" type="submit">
            Save
          </Button>
          <Button type='button' variant="dark" style={{marginLeft: '10px'}} onClick={() => this.setState({isEdit: false})}>
            Cancel
          </Button>
        </Form>
      </FormNew>
    </>
  )
  }
}
