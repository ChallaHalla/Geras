import React, { Component } from 'react';


class SignUp extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
        <div className = "signUpContainer">
        <input name = "fullName"/>
        <input pin = "pin"/>
        </div>
        )
    }
}
export default SignUp;