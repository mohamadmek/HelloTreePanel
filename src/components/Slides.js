import React, { Component } from 'react'
import styled from 'styled-components';
import Slide from './Slide';
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
 bottom: 5%;
 z-index: 400;
 border-radius: 5px;
 box-shadow: 0px 0px 0px 3px rgba(63,63,63,0.75);
 display: ${props => props.isAdd ? 'block' : 'none'};
`;

export default class Slides extends Component {
 constructor(props) {
  super(props);
  this.state = {
   slides: [],
   image: '',
   title: '',
   description: '',
   isAdd: false,
  }
 }

 fetchSlides = async () => {
  try {
   const response = await fetch('http://localhost:8000/api/slides', {
     headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
     }
   });
   const slides = await response.json();
   console.log(slides)
   if(!slides) {
    console.log('err')
   } else {
    this.setState({ slides: slides.slides })
   }
  }catch(err){
   console.log(err)
  }
 }

 handleDelete = async (id, image) => {
  try{
    let body = new FormData();
    body.append('image', image);
    body.append('_method', 'DELETE')
   const response = await fetch(`http://localhost:8000/api/slides/${id}`, {
    method: 'POST',
    body: body,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
   });
   const result = await response.json();
   if(result.status) {
     const slides = this.state.slides.filter(
      slide => slide.id !== id
     );
     this.setState({ slides })
   }
  } catch(err) {
   console.log(err);
  }
 }

 addSlide = async (e) => {
   e.preventDefault();
   let body = new FormData();
   body.append('image', this.state.image);
   body.append('title', this.state.title);
   body.append('description', this.state.description);
   try {
    const response = await fetch(`http://localhost:8000/api/slides/`, {
     method: 'POST',
     body: body,
     headers: {
       Authorization: 'Bearer ' + localStorage.getItem('token'),
     }
    });
    const result = await response.json();
    if(!result){console.log('error')}
    this.setState({image: '', title: '', description: '', isAdd: false});
    this.fetchSlides();
   } catch (err) {
    console.log(err);
   }
  
 }

 componentDidMount() {
  this.fetchSlides();
 }

 render() {
  return (
  <>
  <div style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '25px' }}>- Slides</div>
    <Table striped bordered hover variant="dark" bsPrefix="brochureTrable table">
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Title</th>
          <th>Description Text</th>
          <th style={{textAlign: 'center'}}>Edit</th>
      <th style={{textAlign: 'center'}}>Delete</th>
        </tr>
      </thead>
      <tbody>
      {this.state.slides.map((slide, index) => (
          <Slide
            key={slide.id}
            slide={slide}
            handleDelete={this.handleDelete}
            fetchSlides={this.fetchSlides}
            index={index} />
        ))}
      </tbody>
      </Table>
      <Button style={{background: '#FAD32E', border: 'none'}} variant="dark" onClick={() => this.setState({isAdd: true})} >Add New Slide</Button>
      <FormNew isAdd={this.state.isAdd}>
        <Form onSubmit={(e) => this.addSlide(e)} enctype="multipart/form-data" >
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{color: '#fff', fontSize: '18px'}}>Title</Form.Label>
            <Form.Control type="file" onChange={(e) => this.setState({image: e.target.files[0]})} />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{color: '#fff', fontSize: '18px'}}>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{color: '#fff', fontSize: '18px'}}>Description</Form.Label>
            <Form.Control as="textarea" rows="7" value={this.state.textSecond} onChange={(e) => this.setState({description: e.target.value})} />
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

