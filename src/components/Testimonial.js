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
 bottom: 5%;
 z-index: 400;
 border-radius: 5px;
 box-shadow: 0px 0px 0px 3px rgba(63,63,63,0.75);
 display: ${props => props.isEdit ? 'block' : 'none'};
`;

export default class Testimonial extends Component {
 constructor(props) {
  super(props);
  this.state = {
   isEdit: false,
   image: '',
   name: this.props.testimonial.name,
   quote: this.props.testimonial.quote,
   text: this.props.testimonial.text
  }
 }

 updateTestimonial = async (e) => {
  e.preventDefault();
  const id = this.props.testimonial.id;
  let body = new FormData();
  body.append('image', this.state.image);
  body.append('name', this.state.name);
  body.append('quote', this.state.quote);
  body.append('text', this.state.text);
  body.append('_method', 'PUT');
  try {
    const response = await fetch(`http://localhost:8000/api/testimonials/${id}`, {
     method: 'POST',
     body: body,
     headers: {
       Authorization: 'Bearer ' + localStorage.getItem('token'),
     }
    })
    const result = await response.json();
    if(!result){console.log('error')}
    this.props.fetchTestimonials();
  } catch(err) {
   console.log(err);
  }
  this.setState({ isEdit: false });
 }


render() {
 return (
  <>
    <tr>
      <td>{this.props.index + 1}</td>
      <td><img
       src={`http://localhost:8000/storage/images/${this.props.testimonial.image}`}
       style={{width: '200px', height: '200px'}} alt={this.props.testimonial.image} /></td>
      <td>{this.props.testimonial.quote}</td>
      <td>{this.props.testimonial.name}</td>
      <td>{this.props.testimonial.text}</td>
      <td style={{textAlign: 'center'}} ><button onClick={() => this.setState({isEdit: true})} style={{ cursor: 'pointer',padding: '0px 20px', background: 'transparent', border: 'none', fontSize: '20px', color:'#fff'}}><i class="far fa-edit"></i></button></td>
      <td style={{textAlign: 'center'}}  ><button onClick={() => this.props.handleDelete(this.props.testimonial.id)} style={{cursor: 'pointer', padding: '0px 20px',outline:'none', background: 'transparent', border: 'none', fontSize: '20px', color:'#fff'}}><i class="far fa-trash-alt"></i></button></td>
    </tr>
    <FormNew isEdit={this.state.isEdit}>
     <Form onSubmit={(e) => this.updateTestimonial(e)}>
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
         Save
       </Button>
       <Button type="button" variant="dark" style={{marginLeft: '10px',background: 'rgb(206, 61, 61)'}} onClick={() => this.setState({isEdit: false})}>
         Cancel
       </Button>
     </Form>
   </FormNew>
  </>
 )
 }
}
