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
 bottom: 0;
 z-index: 400;
 border-radius: 5px;
 box-shadow: 0px 0px 0px 3px rgba(63,63,63,0.75);
 display: ${props => props.isEdit ? 'block' : 'none'};
`;

export default class Abouttext extends Component {
constructor(props) {
 super(props);
 this.state = {
  isEdit: false,
  title: this.props.aboutText.title,
  textFirst: this.props.aboutText.textfirst,
  textSecond: this.props.aboutText.titlesecond,
 }
}

 updateAbout = async (e) => {
  e.preventDefault();
  const id = this.props.aboutText.id;
  const form = {
   title: this.state.title,
   textfirst: this.state.textFirst,
   titlesecond: this.state.textSecond
  }
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:8000/api/abouttexts/${id}`, {
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
    if(!result) {
      console.log('error');
    } else {
      this.props.fetchAboutTexts();
      this.setState({ isEdit: false });
    }
    
  } catch(err) {
   console.log(err);
  }
 
 }

 render() {
  return (
    <>
    <tr>
      <td>{this.props.index + 1}</td>
      <td>{this.props.aboutText.title}</td>
      <td>{this.props.aboutText.textfirst}</td>
      <td>{this.props.aboutText.titlesecond}</td>
      <td><button onClick={() => this.setState({isEdit: true})} style={{ cursor: 'pointer',padding: '0px 20px', background: 'transparent', border: 'none', fontSize: '20px', color:'#fff'}}><i class="far fa-edit"></i></button></td>
      <td><button onClick={() => this.props.handleDelete(this.props.aboutText.id)} style={{cursor: 'pointer', padding: '0px 20px',outline:'none', background: 'transparent', border: 'none', fontSize: '20px', color:'#fff'}}><i class="far fa-trash-alt"></i></button></td>
    </tr>
    <FormNew isEdit={this.state.isEdit}>
     <Form onSubmit={(e) => this.updateAbout(e)} >
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

       <Button type="submit" style={{background: '#219910'}}>
         save
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
