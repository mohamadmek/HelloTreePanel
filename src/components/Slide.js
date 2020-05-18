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

export default class Slide extends Component {
 constructor(props) {
  super(props);
  this.state = {
   isEdit: false,
   image: this.props.slide.image,
   title: this.props.slide.title,
   description: this.props.slide.description
  }
 }

updateSlide = async (e) => {
 e.preventDefault();
 const id = this.props.slide.id;
 let body = new FormData();
 body.append('image', this.state.image);
 body.append('title', this.state.title);
 body.append('description', this.state.description);
 body.append('_method', 'PUT');
 try {
   const response = await fetch(`http://localhost:8000/api/slides/${id}`, {
    method: 'POST',
    body: body,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
   })
   const result = await response.json();
   if(!result){console.log('error')}

   this.props.fetchSlides();
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
      <td><img style={{width: '150px', height: '150px'}} src={`http://localhost:8000/storage/images/${this.props.slide.image}`} alt={this.props.slide.image} /></td>
      <td>{this.props.slide.title}</td>
      <td>{this.props.slide.description}</td>
      <td style={{cursor: 'pointer'}} onClick={() => this.setState({ isEdit: true })}>Edit</td>
      <td style={{cursor: 'pointer'}} onClick={() => this.props.handleDelete(this.props.slide.id, this.props.slide.image)} >Delete</td>
    </tr>
    <FormNew isEdit={this.state.isEdit}>
        <Form enctype="multipart/form-data" onSubmit={(e) => this.updateSlide(e)} >
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{color: '#fff', fontSize: '18px'}}>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={(e) => this.setState({image: e.target.files[0]})} />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{color: '#fff', fontSize: '18px'}}>Title</Form.Label>
            <Form.Control name="title" type="text" placeholder="Enter Title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{color: '#fff', fontSize: '18px'}}>Description</Form.Label>
            <Form.Control as="textarea" name="description" rows="7" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
          </Form.Group>

          <Button variant="dark" type="submit">
            Save
          </Button>
          <Button type="button" variant="dark" style={{marginLeft: '10px'}} onClick={() => this.setState({isEdit: false})}>
            Cancel
          </Button>
          </Form>
       </FormNew>
   </>
 )
 }
}
