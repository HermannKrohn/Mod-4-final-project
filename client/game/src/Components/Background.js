import React from 'react'

class Background extends React.Component{

    bgStyle = {        
        width: `calc(${this.props.windowWidth}px)`, 
        height: `calc(${this.props.windowHeight}px)`, 
        top: 0,
        left: 0,
        position: 'absolute'        
    };

    render(){
        return <img src={this.props.map} style={this.bgStyle}/>
    }

}

export default Background