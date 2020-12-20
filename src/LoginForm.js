import './App.css';
import React from "react";
import InputField from './InputField';
import SubmitButton from './SubmitButton'
import UserSide from './Compartment/UserSide';

class LoginForm extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          username:'',
          password: '',
          buttonDisabled: false
      }

  }
  setInputValue(property, val){
      val = val.trim();
      //setting the min length for username and password
      if(val.length>12){
          return;
      }
      this.setState({
          [property]: val
      })
  }

  //resets the form
  resetForm(){
    this.state = {
        username:'',
        password: '',
        buttonDisabled: false
    }
  }
  //call to Login API
  async LoginApi(){
    if(!this.state.username){
        return;
    }
    if(!this.state.password){
        return;
    }
    this.setState({
        buttonDisabled: true
    })
    try{
        let res = await fetch('/accounts/login',{
            method: 'post',
            headers: {
                'Accept': 'application/json'
            }
        })
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })

        let result = await res.json();

        //if logged in
        if(result && result.success){
            UserSide.isLoggedIn = true;            
            UserSide.username = result.username;
        }
        //if incorrect username/password
        else  if(result && result.success==true){
           this.resetForm();
           alert(result.msg);
        }
    }catch(e){
        console.log(e);
        this.resetForm();
    }
  }
  render(){
  return (
    <div className="loginForm"> 
      Log In
      <InputField
        type='text'
        placeholder='UserName'
        value={this.state.username ? this.state.username: ''}
        onChange={(val)=>this.setInputValue('username', val)}//username stored in val
      />
      <InputField
        type='password'
        placeholder='Password'
        value={this.state.password ? this.state.password: ''}
        onChange={(val)=>this.setInputValue('password', val)}//password stored in val
      />
      <SubmitButton
                  text={'Log In'}
                  disabled = {this.state.buttonDisabled}
                  onClick={()=> this.LoginApi()}
                />
    </div>
  );
  }
}

export default LoginForm;
