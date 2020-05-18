import React, { Component } from 'react';
import styled from 'styled-components';
import Brochure from './Brochure';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

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
 display: ${props => props.isAdd ? 'block' : 'none'};
`;

export default class Brochures extends Component {
 constructor() {
  super();
  this.state = {
   brochures: [],
   title: '',
   text: '',
   isAdd: false,
  }
 }

 fetchBrochure = async () => {
  try {
   const response = await fetch('http://localhost:8000/api/brochures', {
     headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
     }
   });
   const brochures = await response.json();
   if(!brochures) {
    console.log('could not fetch brochures')
   } else {
    this.setState({ brochures: brochures.brochures })
   }
  }catch(err){
   console.log(err)
  }
 }

 handleDelete = async (id) => {
  try{
   const response = await fetch(`http://localhost:8000/api/brochures/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
   });
   const brochure = await response.json();
   if(brochure.status) {
     const brochures = this.state.brochures.filter(
      brochure => brochure.id !== id
     );
     this.setState({ brochures })
   }
  } catch(err) {
   console.log(err);
  }
 }

 handleChange = (e) => {
   const {name, value} = e.target;
   this.setState({
     [name] : value
   })
 }

 addBrochure = async (e) => {
   e.preventDefault();
   try {
    const response = await fetch(`http://localhost:8000/api/brochures/`, {
     method: 'POST',
     body: JSON.stringify({
      title: this.state.title,
      text: this.state.text
     }),
     headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
     }
    });
    const result = await response.json();
    if(!result){console.log('error')}
    this.setState({title: '', text: '', isAdd: false});
   } catch (err) {
    console.log(err);
   }
   this.fetchBrochure();
 }

 componentDidMount() {
  this.fetchBrochure();
 }

 

 render() {
  return (
  <>
<div style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '25px' }}>- Brochures</div>
<Table striped bordered hover variant="dark" bsPrefix="brochureTrable table">
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Text</th>
      <th style={{textAlign: 'center'}}>Edit</th>
      <th style={{textAlign: 'center'}}>Delete</th>
    </tr>
  </thead>
  <tbody>
  {this.state.brochures.map((brochure, index) => (
       <Brochure
        key={brochure.id}
        brochure={brochure}
        handleDelete={this.handleDelete}
        fetchBrochure={this.fetchBrochure}
        index={index} />
     ))}
  </tbody>
</Table>
<Button variant="dark" style={{background: '#FAD32E', border: 'none'}} onClick={() => this.setState({isAdd: true})} >Add New Brochure</Button>
<FormNew isAdd={this.state.isAdd}>
     <Form onSubmit={(e) => this.addBrochure(e)}>
       <Form.Group controlId="formBasicEmail">
         <Form.Label style={{color: '#fff', fontSize: '18px'}}>Title</Form.Label>
         <Form.Control type="text" placeholder="Enter Title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
       </Form.Group>

       <Form.Group controlId="exampleForm.ControlTextarea1">
         <Form.Label style={{color: '#fff', fontSize: '18px'}}>Text</Form.Label>
         <Form.Control as="textarea" rows="3" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} />
       </Form.Group>

       <Button variant="dark" type="submit" style={{background: '#219910'}}>
         Add
       </Button>
       <Button type="button" variant="dark" style={{marginLeft: '10px',background: 'rgb(206, 61, 61)'}} onClick={() => this.setState({isAdd: false})}>
         Cancel
       </Button>
     </Form>
   </FormNew>
  </>
  )
 }
}
