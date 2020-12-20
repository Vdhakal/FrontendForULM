import './App.css';
import React from "react";
import UserSide from './Compartment/UserSide';

//Use this class as a component in any necessary submitButtons

class SubmitButton extends React.Component {
  
  render(){
  return (
    <div className="submitButton">
      <button
        className = 'btn'
        disabled = {this.props.disabled}
        onClick = {()=> this.props.onClick()}
      >
        {this.props.text}
      </button>
    </div>
  );
  }
}

export default SubmitButton;
