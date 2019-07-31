import React from 'react'
import map from '../Assets/map.png'
import mario from '../Assets/mario-running-gif-1.gif'
import luigi from '../Assets/luigi.gif'
import Background from './Background'
import Character from './Character';
import { Link } from 'react-router-dom'
import { io } from '../Socket'
import Data from '../Assets/positionData.js'



const FRAMES_PER_SECOND = 60

class Game extends React.Component{

    
    state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        spriteWidth: 100,
        spriteHeight: 100,
        playerX: 0,
        playerY: 0,
        speedX: 0,
        gravity: 0.05,
        gravitySpeed: 20,
        playerVelocityY: 0,
        windowLeft: 0,
        windowTop: 0,
        mapWidth:0,
        opponentSpriteWidth: 100,
        opponentSpriteHeight: 100,
        opponentPlayerX: 150,
        opponentPlayerY: 840,
        opponentPlayerVelocityY: 0,
        opponenetSpeedX: 0,
        calculations: true,
        playerHitWidth: 33,
        playerHitHeight: 70
    }

    opponentData = {
        x: null,
        y: null
    }
    
    gravity = 20
    playerVelocityY = 0
    jump = (e)=>{
        if (e.key === ' '){
            // if(this.state.playerY === 0.543*this.state.mapHeight){
                    this.playerVelocityY = 20
            }
        // } else if (e.key === 's'){
        //     this.makingMyObjects()
        // }
    }

    jumpCalc = () =>{

        let currY
        let currYVel
        let currMapX
        currY = this.state.playerY
        currYVel = this.playerVelocityY
        currMapX = this.state.playerMapX
        if (this.state.playerVelocityY > 0){
            currY = this.state.playerY - this.playerVelocityY
            currYVel = this.playerVelocityY - this.state.gravity
        }
        if (this.state.playerY < 0.543*this.state.mapHeight && this.state.playerVelocityY <= 0){//gravity
            if (this.gravity === 0){

            } else{
                this.playerVelocityY = 0
                currYVel = 0
                currY = this.state.playerY + this.gravity

            }
        }
        if(this.state.playerY > 0.543*this.state.mapHeight){//floor
            currY = 0.543*this.state.mapHeight
            currYVel = 0
        }
        if (this.state.playerY < 0.15*this.state.mapHeight){//max height
            currYVel = 0
        }
        return({playerY: currY, playerVelocityY: currYVel, playerMapX: currMapX})
    }

    win = ()=>{
        if (this.state.playerX < 0.3229166666666667*window.innerWidth){
            this.setState({playerX: this.state.playerX + 5, calculations: false})
        } else if(this.state.playerX < 0.5239583333333333*window.innerWidth){
            this.setState({playerX: this.state.playerX + 5, playerY: this.state.playerY - 4.75})
        } else if(this.state.playerX < 0.5473958333333333*window.innerWidth){
            this.setState({playerX: this.state.playerX + 5})
        } else if(this.state.playerX < 0.640625*window.innerWidth){
            this.setState({playerX: this.state.playerX + 5, playerY: this.state.playerY + 5.25})
        } else if(this.state.playerX <  0.7692708333333333*window.innerWidth){
            this.setState({playerX: this.state.playerX + 5, playerY: this.state.playerY - 5.25})
        } else if(this.state.playerY <  0.543*this.state.mapHeight){
            this.setState({playerY: this.state.playerY + 5})
        } else{
            this.setState({playerX: this.state.playerX + 5})     
        }
       
    }
    mapMovement = () => {
        let displayLeft = this.state.windowLeft
        let currMapX = this.state.playerMapX
        if(this.state.windowLeft > this.state.mapWidth * 0.825){
           
            displayLeft = this.state.windowLeft - (this.state.mapWidth * -0.0009)
            currMapX = this.state.playerMapX - (this.state.mapWidth * 0.0009)
            if(displayLeft < this.state.mapWidth * 0.825){
                displayLeft = this.state.mapWidth * 0.825
            }
        } else {
            // console.log(this.state.windowLeft,  this.state.mapWidth)
            this.win()
        }
        return ({displayLeft: displayLeft, playerMapX: currMapX})
    }

    collisionDetecter = () => {
        for(let i in Data){
            
            const objectLeftSide = Data[i].coordX
            const objectRightSide = Data[i].coordX + Data[i].width
            const objectTop = Data[i].coordY
            const objectBottom = Data[i].coordY + Data[i].height

            const playerLeftSide = this.state.playerMapX
            const playerRightSide = this.state.playerMapX + this.state.playerHitWidth 
            const playerTop = this.state.playerY
            const playerBottom = this.state.playerY + this.state.playerHitHeight

            const xVelocity = this.state.mapWidth * -0.0009
            const yVelocity = Math.abs(this.state.playerVelocityY)

            const xAligned = (
                (objectLeftSide < playerLeftSide && playerLeftSide < objectRightSide && playerRightSide > objectRightSide)
                    ||
                (objectLeftSide < playerRightSide && playerRightSide < objectRightSide && playerLeftSide < objectLeftSide)
                    ||
                (playerLeftSide < objectLeftSide && objectRightSide < playerRightSide)
                    ||
                (playerLeftSide > objectLeftSide && playerRightSide < objectRightSide)
            )

            const yAligned = (
                (objectTop < playerTop && playerTop < objectBottom && objectBottom < playerBottom)
                    ||
                (objectTop < playerBottom && playerBottom < objectBottom && playerTop < objectTop)
                    ||
                (playerTop < objectTop && objectBottom < playerBottom)
                    ||
                (objectTop < playerTop && playerBottom < objectBottom)
            )

            const colliding =  xAligned && yAligned

            const theGround = 0.543*this.state.mapHeight 

            const falling = (
                yVelocity == 0 
                    &&
                playerTop != theGround
            )
            
            let collidingTop = (
                colliding 
                    &&
                falling
            )
            
            const collidingSide = (
                colliding 
                    &&
                xVelocity > yVelocity
            )

            if(colliding){
                if(collidingTop){
                        console.log("COLLIDING TOP")
                        this.gravity = 0
                        return true
                }else if(collidingSide){
                        console.log("COLLIDING SIDE")
                        return false
                 }else{
                    console.log("NO COLLISION")
                    this.gravity = 20 
                }
            }
        }
            
            // for(let i in Data){
            //     if(Data[i].coordX < this.state.playerMapX + this.state.playerHitWidth &&
            //             Data[i].coordY < this.state.playerY + this.state.playerHitHeight){
            //                 return false
            //     }else if(Data[i].coordX < this.state.playerMapX + this.state.playerHitWidth && 
            //             Data[i].coordX + Data[i].width > this.state.playerMapX &&
            //             Data[i].coordY < this.state.playerY + this.state.playerHitHeight){
            //                 this.gravity = 0
            //                 return true
            //     }else{
            //         this.gravity = 20 
            //         // return true
            //     }
            // }
            this.gravity = 20 
            return true
            // return answer
    }
    gameLoop = () => {
        let displayLeft = this.collisionDetecter() ? this.mapMovement() : {displayLeft: this.state.windowLeft, playerMapX: this.state.playerMapX } 
        let numbers = this.state.calculations ? this.jumpCalc() : {playerY: this.state.playerY, playerVelocityY: this.state.playerVelocityY}
        io.emit('playerMovement', {
            x: displayLeft.playerMapX,
            y: numbers.playerY,
            queue: this.props.match.params.queue
        })

        this.setState({windowLeft: displayLeft.displayLeft, playerY: numbers.playerY, playerVelocityY: numbers.playerVelocityY, playerMapX: displayLeft.playerMapX,
            opponentPlayerX: this.opponentData.x, opponentPlayerY: this.opponentData.y})
    }

    updateWindowDimensions = () => {
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight})
    }
    clickCounter = 0
    click1 = {}
    click2 = {}
    objects = []
    randomUtility = (e)=>{
        this.clickCounter++
        
        if (this.clickCounter % 2 === 0){
            this.click2 = this.getCoordinates(e)
            let x1 = this.click1.x
            let y1 = this.click1.y
            let x2 = this.click2.x
            let y2 = this.click2.y
            let width = (x1-x2)*-1
            let height = (y1-y2)*-1
            let coordX = x1
            let coordY = y2
            this.click1 = {}
            this.click2 = {}
            this.objects.push({width: width, height: height, coordX: coordX, coordY: coordY})
        } else {
            this.click1 = this.getCoordinates(e)
        }
    }
    
    getCoordinates(e)
    {
        var PosX = 0;
        var PosY = 0;
        var ImgPos;
        let myImg = document.querySelector(".mapImg")
        ImgPos = this.findPosition(myImg);
        if (!e) e = window.event;
        if (e.pageX || e.pageY)
        {
            PosX = e.pageX;
            PosY = e.pageY;
        }
        else if (e.clientX || e.clientY)
            {
            PosX = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            PosY = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
            }
        PosX = PosX - ImgPos[0];
        PosY = PosY - ImgPos[1];
        return ({x: PosX, y: PosY})
    }

    findPosition(oElement)
    {
    if(typeof( oElement.offsetParent ) != "undefined")
    {
        for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
        {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
        }
        return [ posX, posY ];
        }
        else
        {
        return [ oElement.x, oElement.y ];
        }
    }
    makingMyObjects = ()=>{
        console.log(this.objects)
    }

    componentDidMount = () => {
        // console.log(this.props.match.params.queue)
        // console.log(Data)
        // window.addEventListener('click', (e)=>{this.randomUtility(e)})
        window.addEventListener('keydown', (e)=>{this.jump(e)}) 
        this.halfWidth = this.state.spriteWidth / 2;
        this.halfHeight = this.state.spriteHeight / 2
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
       
        let mapImg = document.querySelector(".mapImg")
        mapImg.onload = () => {
            let mapHeight= mapImg.getBoundingClientRect().height
            let mapWidth = mapImg.getBoundingClientRect().width
            this.setState({mapWidth: mapWidth*-1, mapHeight: mapHeight, playerX: 0.10416666666666667*window.innerWidth, playerY: mapHeight * 0.543, playerMapX: mapWidth * 0.01815141702118653}, 
                () => {
                    this.gameInterval = setInterval(this.gameLoop, 1000/FRAMES_PER_SECOND)
                })
            
        }
        window.addEventListener('keydown', (e)=>{this.jump(e)})
        io.on('updateOpponent', data => {
            this.opponentData = {
                x: data.x,
                y: data.y
            }
            // console.log("OP: ", this.opponentData)
        })
    }

    componentWillUnmount = () => {//useful if have a button to main menu after race
        window.removeEventListener('resize', this.updateWindowDimensions)
        clearInterval(this.gameInterval)

    }

    render(){
        
        return(
            <div>
                <Character charImg={mario} centreX={this.state.playerX} centreY={this.state.playerY} width={this.state.spriteWidth} height={this.state.spriteHeight}/>
                <Character charImg={luigi} centreX={this.state.opponentPlayerX} centreY={this.state.opponentPlayerY} width={this.state.opponentSpriteWidth} height={this.state.opponentSpriteHeight}/>
                <Background map={map} windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} windowLeft={this.state.windowLeft}/>
            </div> 
        )
    }
}

export default Game