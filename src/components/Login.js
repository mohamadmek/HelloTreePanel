import React, { Component } from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
z-index: 1000;
position: absolute;
top: 0;
right: 0;
left: 0;
bottom: 0;
flex-wrap: wrap;
@media all and (max-width: 588px){
  .d_mn{
    display: none;
  }
}
`;

// const Description = styled.div`
// background-color: rgb(81, 197, 183);
// width: 50%;
// `;

const Logins = styled.div`
width: 100%;
@media all and (max-width:588px){
  width:100%;
}
background: #343a40;
`;

const Button1 = styled.button`
padding: 10px 15px;
border-top-right-radius: 50px;
border-bottom-right-radius: 50px;
background-color: ${props => props.signStatus ? 'rgb(95, 113, 132)' : '#FAD32E'};
border: none;
cursor: pointer;
font-weight: bold;
color: #fff;
`;

const Button2 = styled.button`
padding: 10px 15px;
border-top-left-radius: 50px;
border-bottom-left-radius: 50px;
background-color: ${props => props.signStatus ? '#FAD32E' : 'rgb(95, 113, 132)'};
border: none;
cursor: pointer;
font-weight: bold;
color: #fff;
`;

const Header = styled.div`
display: flex;
margin-top: 100px;
margin-left: 550px;
margin-bottom: 20px;
@media all and (max-width: 870px){
  margin-left: 30px !important;
  
}
.btw{
  margin: 0 8px;
  padding-top: 5px;
  color: #E1E1E1;
}
.signInTitle,.signUpTitle{
  font-size: 1.4rem;
  color: #E1E1E1;
  font-weight: 400;
}
.signInTitle{
  color: ${props => props.signStatus ? '#fff' : '#E1E1E1'};
  padding-bottom: ${props => props.signStatus ? '5px' : '0px'};
  border-bottom: ${props => props.signStatus ? '2px solid #FAD32E' : 'none'};
}
.signUpTitle{
  color: ${props => props.signStatus ? '#E1E1E1' : '#fff'};
  padding-bottom: ${props => props.signStatus ? '0px' : '5px'};
  border-bottom: ${props => props.signStatus ? 'none' : '2px solid #FAD32E'};
}
`;

const Input = styled.input`
  background: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-color: rgb(95, 113, 132);
  font-size: 14px;
  color: #E1E1E1;
  margin-top: 5px;
  padding-right: 20%;
  margin-bottom: 10px;
  @media all and (max-width: 870px){
    padding-right:20%;
  }
`;

const SignUpButton = styled.button`
  padding: 10px 40px;
  border-radius: 50px;
  background-color: #FAD32E;
  border: none;
  margin-top: 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;
const Form = styled.form`
 margin-left: 550px;
  @media all and (max-width: 870px){
    margin-left:30px;
  }
  label {
   margin-top: 5px;
  }
`;





export default class Login extends Component {
 constructor() {
  super();
  this.state = {
     signStatus : true,
     username: '',
     email: '',
     password: '',
     message: ''

  }
 }

  handleClickLogin = () => {
  this.setState({
    signStatus: false,
  })
 }
  handleClickSignup = () => {
  this.setState({
    signStatus: true,
  })
 }

  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  postSignUp = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch(`http://localhost:8000/api/register`, {
      method: 'POST',
      body: JSON.stringify({
       name: this.state.username,
       email: this.state.email,
       password: this.state.password
      }),
      headers: {
       'Content-Type': 'application/json'
      }
     });
     const result = await response.json();
     
     if(result.access_token) {
      this.setState({
       username: '',
       email: '',
       password: '',
       message: 'Signed up successfully'
      })
     } else {
      this.setState({
       message: 'Sign up Failed'
      })
     }
   } catch(err) {
    console.log(err);
   }
  }

  handleLogin = async (e) => {
   e.preventDefault();
   // let body = new FormData();
   // body.append('email', this.state.email);
   // body.append('password', this.state.password);
   try {
    const response = await fetch(`http://localhost:8000/api/login`, {
     method: 'POST',
     // body: body,
     body: JSON.stringify({
      email: this.state.email,
      password: this.state.password,
     }),
     headers: {
      'Content-Type' : 'application/json'
     }
    });
    const result = await response.json();
    const responseUser = await fetch(`http://localhost:8000/api/user/${this.state.email}`, {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
     });
     const user = await responseUser.json();
     localStorage.setItem('userName', user.user.name);
    if(result.access_token) {
     localStorage.setItem('token', result.access_token);
     this.setState({ email: '', password: '' })
     window.location= '#brochures'
    } else {
     this.setState({ message: 'Login Failed' })
    }
   } catch(err) {
    console.log(err);
   } 
  }

  signUpForm = () => {
  return (
    <Form onSubmit={(e) => this.postSignUp(e)} >
  <label htmlFor="username" style={{display:"block", color: "#fff"}}>USERNAME</label>
  <Input
    type='text'
    name="username" 
    placeholder="Enter you Username"
    onChange={this.changeHandler}
    value={this.state.username}
    required
    />
  <label htmlFor="email" style={{display:"block", color: "#fff"}}>EMAIL</label>
  <Input value={this.state.email} onChange={this.changeHandler}  type="email" name="email" placeholder="Enter you Email" required />
  <label htmlFor="password" style={{display:"block", color: "#fff"}}>PASSWORD</label>
  <Input value={this.state.password} onChange={this.changeHandler} type="password" name="password" placeholder="Enter you Password" style={{display:"block"}} required />
 
  <div style={{color: '#ccc', fontWeight: 'bold', marginTop: "0px"}}><input type="checkbox" style={{cursor:"pointer"}}/> I agree all statements in <span style={{color:'#fff', borderBottom:'2px solid #FAD32E'}}>terms of service</span></div>
  <div style={{color: '#ccc', fontWeight:'bold', fontSize:'18px'}}>{ this.state.message }</div>
  <SignUpButton type='submit'>Sign Up</SignUpButton>
  <span style={{marginLeft: '10px', color: '#E1E1E1',borderBottom:'2px solid #FAD32E', cursor:"pointer"}} onClick={this.handleClickSignup}>I'm already a member</span>
 </Form>
  )
 }
 
 
 
  signInForm = () => {
  return (
    <Form onSubmit={(e) => this.handleLogin(e)} >
 <label for="email" style={{display:"block", color: "#fff"}}>Email</label>
 <Input
 type="email" 
 name="email" 
 placeholder="Enter you Email"
 onChange={e => this.setState({ email: e.target.value })}
 value={this.state.email}
 />
 <label for="password" style={{display:"block", color: "#fff"}}>PASSWORD</label>
 <Input 
  type="password" 
  name="password" 
  placeholder="Enter you Password" 
  style={{display:"block"}}
  value={this.state.password}
  onChange={e => this.setState({ password: e.target.value })} />
  <div style={{color:'#ccc', fontWeight: 'bold', fontSize: '20px'}}>{this.state.message}</div>
 <SignUpButton type="submit">Sign In</SignUpButton>
 <span style={{marginLeft: '10px', color: '#E1E1E1',borderBottom:'2px solid #FAD32E', cursor:"pointer"}} onClick={this.handleClickLogin}>Sign Up</span>
 </Form>
  )
 }


 render() {
  return (
   <Wrapper>
   <Logins class="m_w100">
   <div style={{textAlign: "right", margin: "20px 20px 0 400px"}} >
   <Button2 onClick={this.handleClickSignup} signStatus={this.state.signStatus}>Sign In</Button2>
   <Button1 onClick={this.handleClickLogin} signStatus={this.state.signStatus}>Sign Up</Button1>
   </div>
   <Header signStatus={this.state.signStatus}>
     <div className="signInTitle">Sign In</div>
     <div className="btw">or</div>
     <div className="signUpTitle">Sign Up</div>
   </Header>
   {this.state.signStatus ? this.signInForm() : this.signUpForm()}
   
 </Logins>
</Wrapper>
  )
 }
}
