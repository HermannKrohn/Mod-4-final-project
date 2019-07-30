import React, { Component } from 'react';
import './Character.css'

class Character extends Component {
    
    render() { 
        let left = Math.round(this.props.centreX - (this.props.width / 2));
        let top = Math.round(this.props.centreY - (this.props.height / 2));
        let style = {
            width: `calc(${this.props.width}px)`, 
            height: `calc(${this.props.height}px)`, 
            top: `calc(${top}px)`,
            left: `calc(${left}px)`, 
            position: 'absolute',
            zIndex: 10 
        }
       
        return ( 
            <div onKeyDown={(e) => {this.props.pullDown(e)}} tabIndex="0">
                   <img  className="character" style={style} src={this.props.charImg} alt=" " />      
            </div>
         );
    }
}
 
export default Character;