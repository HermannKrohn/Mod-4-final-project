import React from 'react'
import map from '../Assets/map.png'
import mario from '../Assets/mario-running-gif-1.gif'
import Background from './Background'
import Character from './Character';
import { Link } from 'react-router-dom'

const FRAMES_PER_SECOND = 60

class Game extends React.Component{


    state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        spriteWidth: 100,
        spriteHeight: 100,
        playerX: 300,
        playerY: 543,
        speedX: 0,
        speedY: 0,
        gravity: 0.05,
        gravitySpeed: 0,
        playerVelocityY: 0,
        windowLeft: 0,
        windowTop: 0
    }
    
    jump = (e)=>{
        if (e.key === ' '){
            console.log(e, 'space')

        }
    }
    pullDown = ()=>{
    // setInterval(() => {
    //      this.setState({
    //          playerY: this.state.playerY + 10 
    //     })},100)
    }

       

    gameLoop = () => {
        if(this.state.windowLeft > -6560){
            console.log(this.state.windowLeft)
            this.setState({windowLeft: this.state.windowLeft-2})
        }
    }

    updateWindowDimensions = () => {
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight})
    }

    componentDidMount = () => {
        this.halfWidth = this.state.spriteWidth / 2;
        this.halfHeight = this.state.spriteHeight / 2
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.gameInterval = setInterval(this.gameLoop, FRAMES_PER_SECOND / 1000)
    }

    componentWillUnmount = () => {//useful if have a button to main menu after race
        window.removeEventListener('resize', this.updateWindowDimensions)
        clearInterval(this.gameInterval)

    }

    render(){
        window.addEventListener('keydown', (e)=>{this.jump(e)})
        return(
            <div>
            <Character pullDown={this.pullDown} charImg={mario} centreX={this.state.playerX} centreY={this.state.playerY} 
                width={this.spriteWidth} height={this.spriteHeight}/>
                <Background map={map} windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} windowLeft={this.state.windowLeft}/>
            </div> 
        )
    }
}

export default Game