import React from 'react'

class Background extends React.Component{

    bgStyle = {
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