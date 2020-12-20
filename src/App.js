import './App.css';
import React              from "react";
import {observer}         from 'mobx-react';
import UserSide           from './Compartment/UserSide';
import LoginForm          from './LoginForm';
import SubmitButton       from './SubmitButton';

class App extends React.Component {
  
  async loginApiHandler(){
    try{
      let isLoggedIn = await fetch('/accounts/login', {
        method: 'post',
        headers: {

        }
      });
      let result = await isLoggedIn.json();

      if(result && result.success){
        UserSide.loading = false;
        UserSide.isLoggedIn = true;
        UserSide.username = result.username;
      }
      else{
        UserSide.loading = false;
        UserSide.isLoggedIn = false;
      }

    }
    catch(e){
      UserSide.loading = false;
      UserSide.isLoggedIn = false;

    }
  }
  async logoutApiHandler(){
    try{
      let isLoggedOut = await fetch('/accounts/logout', {
        method: 'post',
        headers: {

        }
      });
      let result = await isLoggedOut.json();

      if(result && result.success){
        UserSide.loading = false;
        UserSide.isLoggedIn = true;
        UserSide.username = '';
      }
      else{
        UserSide.loading = false;
        UserSide.isLoggedIn = false;
      }

    }
    catch(e){
      console.log(e);

    }
  }
  render(){
    if(UserSide.loading){
      return (
        <div className="app">
            <div className="app">
              Loading.....
            </div>
        </div>
      );
    }
    else{
      if(UserSide.isLoggedIn){
        return (
          <div className="app">
              <div className="container">
                Hey there {UserSide.username};
                <SubmitButton
                  text={'Log me out'}
                  disabled = {false}
                  onClick={()=> this.logoutApiHandler()}
                />
              </div>
          </div>
        );
      }

      return (
        <div className="app">
          <div className="container">
            
            <LoginForm />
          </div>
        </div>
      );
    }
    }
}

export default observer(App);
