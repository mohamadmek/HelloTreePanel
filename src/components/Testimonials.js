import React, { Component } from 'react'
import styled from 'styled-components';
import Testimonial from './Testimonial';
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

export default class Testimonials extends Component {
  constructor() {
    super();
    this.state= {
      testimonials: [],
      isAdd: false,
      quote: '',
      name: '',
      text: '',
      image: '',
    }
  }
  fetchTestimonials = async () => {
    try {
     const response = await fetch('http://localhost:8000/api/testimonials', {
       headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
       }
     });
     const testimonials = await response.json();
     console.log(testimonials)
     if(!testimonials) {
      console.log('err')
     } else {
      this.setState({ testimonials: testimonials.testimonials })
     }
    }catch(err){
     console.log(err)
    }
   }
  
   handleDelete = async (id) => {
    try{
     const response = await fetch(`http://localhost:8000/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
     });
     const result = await response.json();
     if(result.status) {
       const testimonials = this.state.testimonials.filter(
        testimonial => testimonial.id !== id
       );
       this.setState({ testimonials })
     }
    } catch(err) {
     console.log(err);
    }
   }
  
   addTestimonial = async (e) => {
     e.preventDefault();
     let body = new FormData();
     body.append('image', this.state.image);
     body.append('quote', this.state.quote);
     body.append('name', this.state.name);
     body.append('text', this.state.text);
     try {
      const response = await fetch(`http://localhost:8000/api/testimonials/`, {
       method: 'POST',
      body: body,
       headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
       }
      });
      const result = await response.json();
      if(!result){console.log('error')}
      this.setState({image: '', name: '', text: '', quote: '', isAdd: false});
     } catch (err) {
      console.log(err);
     }
     this.fetchTestimonials();
   }
  
   componentDidMount() {
    this.fetchTestimonials();
   }
  
   render() {
    return (
      <>
      <div style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '25px' }}>- Testimonials</div>
      <Table striped bordered hover variant="dark" bsPrefix="brochureTrable table">
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Quote</th>
          <th>Name</th>
          <th>Text</th>
          <th style={{textAlign: 'center'}}>Edit</th>
      <th style={{textAlign: 'center'}}>Delete</th>
        </tr>
      </thead>
      <tbody>
      {this.state.testimonials.map((testimonial, index) => (
          <Testimonial
            key={testimonial.id}
            testimonial={testimonial}
            handleDelete={this.handleDelete}
            fetchTestimonials={this.fetchTestimonials}
            index={index} />
        ))}
      </tbody>
    </Table>
    <Button style={{background: '#FAD32E', border: 'none'}} variant="dark" onClick={() => this.setState({isAdd: true})} >Add New Testimonial</Button>
    <FormNew isAdd={this.state.isAdd}>
     <Form onSubmit={(e) => this.addTestimonial(e)}>
       <Form.Group controlId="formBasicEmail">
        <Form.Label style={{color: '#fff', fontSize: '18px'}}>Image</Form.Label>
        <Form.Control type="file" onChange={(e) => this.setState({image: e.target.files[0]})} />
       </Form.Group>

       <Form.Group controlId="formBasicEmail">
         <Form.Label style={{color: '#fff', fontSize: '18px'}}>Quote</Form.Label>
         <Form.Control type="text" placeholder="Enter Title" value={this.state.quote} onChange={(e) => this.setState({ quote: e.target.value })} />
       </Form.Group>

       <Form.Group controlId="formBasicEmail">
         <Form.Label style={{color: '#fff', fontSize: '18px'}}>First Text</Form.Label>
         <Form.Control type="text" placeholder="Enter Name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
       </Form.Group>

       <Form.Group controlId="exampleForm.ControlTextarea1">
         <Form.Label style={{color: '#fff', fontSize: '18px'}}>Text</Form.Label>
         <Form.Control as="textarea" rows="7" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} />
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

