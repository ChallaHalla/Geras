import React, { Component } from 'react';


function ChooseCommunity(props){

    return(
            <div>
               <h1>Are you located at ?</h1>
               <br />
               <button type='button' onClick={props.progressStage}>
               Yes!
               </button>
            </div>
        )
};
export default ChooseCommunity;