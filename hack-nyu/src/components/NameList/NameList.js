import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';

class NameList extends Component{
    render(){
        const userName = {};
        const names =["User1 ","User2 ","User3 ","User4 "]
        return (
            <div>
            {names.map((n)=>{
              return <button name="username" value={n} onClick={(e)=>{
                this.props.progressStage();
                this.props.handleChange(e);
              }}>{n}</button>;
            })}
            </div>
        )
    }
}
export default NameList;
