import React, { Component } from 'react';
import SignUpButton from '../SignUpButton/SignUpButton';


class Login extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const location = "Your Retirement Home Here"
        //if (checkId(cookie) === false){
        return(
            <div>
               <h1>Are you located at {location}?</h1>
               <SignUpButton type={false} handleClick={this.handleVote} />
               <SignUpButton type={true} handleClick={this.handleVote} />
            </div>
        )//}
    }
};
export default Login;