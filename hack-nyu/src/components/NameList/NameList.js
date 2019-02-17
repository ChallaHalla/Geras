import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';

class NameList extends Component{
    render(){
        const userName = {};
        const names =["User1 ","User2 ","User3 ","User4 "]
        return (
            <div>
                <h1>Pick a username!</h1>
                <h1>{names}</h1>
            </div>
        )
    }
}
export default NameList;