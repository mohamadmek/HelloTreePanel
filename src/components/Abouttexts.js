import React, { Component } from 'react'
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Aboutext from './Abouttext';

const FormNew = styled.div`
 width: 500px;
 margin: 0 auto;
 border: 1px solid white;
 padding: 20px;
 background: #454d55;
 position: fixed;
 left: 40%;
 bottom: 5%;
 z-index: 400;
 border-radius: 5px;
 box-shadow: 0px 0px 0px 3px rgba(63,63,63,0.75);
 display: ${props => props.isAdd ? 'block' : 'none'};
`;

export default class Abouttexts extends Component {
 constructor() {
  super();
  this.state = {
   aboutTexts: [],
   isEdit: false,
   title: '',
   textFirst: '',
   textSecond: ''
  }
 }

 fetchAboutTexts = async () => {
  try {
   const response = await fetch('http://localhost:8000/api/abouttexts', {
     headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
     }
   });
   const aboutTexts = await response.json();
   if(!aboutTexts) {
    console.log('err')
   } else {
    this.setState({ aboutTexts: aboutTexts.abouttexts })
   }
  }catch(err){
   console.log(err)
  }
 }

 handleDelete = async (id) => {
  try{
   const response = await fetch(`http://localhost:8000/api/abouttexts/${id}`, {
    method: 'DELETE',
    header: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
   });
   const result = await response.json();
   if(result.status) {
     const aboutTexts = this.state.aboutTexts.filter(
      aboutText => aboutText.id !== id
     );
     this.setState({ aboutTexts })
   }
  } catch(err) {
   console.log(err);
  }
 }

addAboutText = async (e) => {
 e.preventDefault();
 try {
  const response = await fetch(`http://localhost:8000/api/abouttexts/`, {
   method: 'POST',
   body: JSON.stringify({
    title: this.state.title,
    textfirst: this.state.textFirst,
    titlesecond: this.state.textSecond
   }),
   headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
   }
  });
  const result = await response.json();
  if(!result){console.log('could not add About Text')}
  this.setState({title: '', textFirst: '', textSecond: '', isEdit: false});
 } catch (err) {
  console.log(err);
 }
 this.fetchAboutTexts();
}

 componentDidMount() {
  this.fetchAboutTexts();
 }

 render() {
  return (
   <>
   <div style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '25px' }}>- About Texts</div>
     <Table striped bordered hover variant="dark" bsPrefix="brochureTrable table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>First Text</th>
          <th>Second Text</th>
          <th style={{textAlign: 'center'}}>Edit</th>
      <th style={{textAlign: 'center'}}>Delete</th>
        </tr>
      </thead>
      <tbody>
      {this.state.aboutTexts.map((aboutText, index) => (
          <Aboutext
            key={aboutText.id}
            aboutText={aboutText}
            handleDelete={this.handleDelete}
            fetchAboutTexts={this.fetchAboutTexts}
            index={index} />
        ))}
      </tbody>
    </Table>
    <Button variant="dark" style={{background: '#FAD32E', border: 'none'}} onClick={() => this.setState({isAdd: true})} >Add New About Text</Button>
    <FormNew isAdd={this.state.isAdd}>
     <Form onSubmit={(e) => this.addAboutText(e)}>
       <Form.Group controlId="formBasicEmail">
         <Form.Label style={{color: '#fff', fontSize: '18px'}}>Title</Form.Label>
         <Form.Control type="text" placeholder="Enter Title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
       </Form.Group>

       <Form.Group controlId="exampleForm.ControlTextarea1">
         <Form.Label style={{color: '#fff', fontSize: '18px'}}>First Text</Form.Label>
         <Form.Control as="textarea" rows="7" value={this.state.textFirst} onChange={(e) => this.setState({textFirst: e.target.value})} />
       </Form.Group>

       <Form.Group controlId="exampleForm.ControlTextarea1">
         <Form.Label style={{color: '#fff', fontSize: '18px'}}>Second Text</Form.Label>
         <Form.Control as="textarea" rows="7" value={this.state.textSecond} onChange={(e) => this.setState({textSecond: e.target.value})} />
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

