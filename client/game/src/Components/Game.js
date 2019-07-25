import React from 'react'
import map from '../Assets/map.png'
import Background from './Background'
import { Link } from 'react-router-dom'

const FRAMES_PER_SECOND = 60

class Game extends React.Component{

    state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        windowLeft: 0,
        windowTop: 0
    }

    gameLoop = () => {
        if(this.state.windowLeft > -7640){
            this.setState({windowLeft: this.state.windowLeft-2})
        }
    }

    updateWindowDimensions = () => {
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight})
    }

    componentDidMount = () => {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.gameInterval = setInterval(this.gameLoop, FRAMES_PER_SECOND / 1000)
    }

    componentWillUnmount = () => {//useful if have a button to main menu after race
        window.removeEventListener('resize', this.updateWindowDimensions)
        clearInterval(this.gameInterval)
    }

    render(){
        return(
            <div>
                <Background map={map} windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} windowLeft={this.state.windowLeft}/>
            </div> 
        )
    }
}

export default Game