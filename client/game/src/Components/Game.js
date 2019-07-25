import React from 'react'
import map from '../Assets/map.png'
import Background from './Background'

class Game extends React.Component{

    state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    }

    render(){
        return(
            <Background map={map} windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight}/>
        )
    }
}

export default Game