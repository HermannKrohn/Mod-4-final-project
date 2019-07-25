import React, { Component } from 'react';

class Character extends Component {
    state = {  }
    // characterJump(e) {
    //     if (e.key === " "){
    //     }
    //     console.log(e)
    // }
    render() { 
        return ( 
            <div onKeyDown={this.characterJump}>
                <img src='https://gifimage.net/wp-content/uploads/2017/10/mario-running-gif-1.gif' alt="logo" />              
            </div>
         );
    }
}
 
export default Character;