import './App.css';
import React from "react";
import UserCompartment from './Compartment/UserSide';

//Use this class as a component in any necessary input fields
class InputField extends React.Component {
  
  render(){
  return (
    <div className="inputField">
        <input
            className='input'
            type = {this.props.type}
            placeholder={this.props.placeholder}
            value = {this.props.value}
            onChange={(e)=> this.props.onChange(e.target.value)}
            />
    </div>
  );
  }
}

export default InputField;
