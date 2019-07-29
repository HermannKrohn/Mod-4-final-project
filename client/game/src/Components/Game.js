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
        playerX: 150,
        playerY: 840,
        speedX: 0,
        speedY: 0,
        gravity: 0.05,
        gravitySpeed: 0,
        playerVelocityY: 0,
        windowLeft: 0,
        windowTop: 0,
        mapWidth: 0
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

    mapMovement = () => {
        if(this.state.windowLeft > this.state.mapWidth * 0.825){
            let displayLeft = this.state.windowLeft - (this.state.mapWidth * -0.0009)
            if(displayLeft < this.state.mapWidth * 0.825){
                displayLeft = this.state.mapWidth * 0.825
            }
            return displayLeft
        }
    }

    gameLoop = () => {
        let displayLeft = this.mapMovement()

        this.setState({windowLeft: displayLeft})
    }

    updateWindowDimensions = () => {
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight})
    }

    componentDidMount = () => {
        this.halfWidth = this.state.spriteWidth / 2
        this.halfHeight = this.state.spriteHeight / 2
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.gameInterval = setInterval(this.gameLoop, 1000/FRAMES_PER_SECOND)
        let mapImg = document.querySelector(".mapImg")
        mapImg.onload = () => {
            let mapWidth = mapImg.getBoundingClientRect().width
            this.setState({mapWidth: mapWidth*-1})
        }
        window.addEventListener('keydown', (e)=>{this.jump(e)})
    }

    componentWillUnmount = () => {//useful if have a button to main menu after race
        window.removeEventListener('resize', this.updateWindowDimensions)
        clearInterval(this.gameInterval)

    }

    render(){
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