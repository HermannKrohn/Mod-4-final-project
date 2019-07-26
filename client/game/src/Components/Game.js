import React from 'react'
import map from '../Assets/map.png'
import mario from '../Assets/mario-running-gif-1.gif'
import Background from './Background'
import Character from './Character';

class Game extends React.Component{

    constructor(props){
        super(props)
        this.spriteWidth = 100;
        this.spriteHeight = 100;

        this.halfWidth = this.spriteWidth / 2;
        this.halfHeight = this.spriteHeight / 2;
    }

    state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        playerX: 300,
        playerY: 543,
        speedX: 0,
        speedY: 0,
        gravity: 0.05,
        gravitySpeed: 0,
        playerVelocityY: 0
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

    render(){
        window.addEventListener('keydown', (e)=>{this.jump(e)})
        return(
            <div>
            <Character pullDown={this.pullDown} charImg={mario} centreX={this.state.playerX} centreY={this.state.playerY} 
                width={this.spriteWidth} height={this.spriteHeight}/>
            <Background map={map} windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight}/>
            </div>
        )
    }
}

export default Game