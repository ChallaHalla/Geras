import React, { Component } from 'react';
import SignUpButton from '../components/VoteButton/SignUpButton.js';
import Login from '../components/Login.js';
import SignUp from '../components/SignUp.js';
import NameList from '../components/NameList.js';

class SignInView extends Component{
    constructor(props){
        super(props);
        this.state = 2
    }
    render(){
        
        if (this.state == 0){
            return <Login/>
        }
        if (this.state == 1) {
            return <SignUp/>
        }
        if (this.state == 2){
            return <NameList/>
        }
    }

}
export default SignInView;