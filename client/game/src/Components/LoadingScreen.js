import React from 'react'
import { io } from '../Socket'
import { Link } from 'react-router-dom'

class Loading extends React.Component{

    // state = {
    //     queue: null
    // }
    componentDidMount = () => {
        let queue
        io.on('gameQueue', (data) => {
            queue = data.queue
        })
        io.on('startGame', () => {
            this.props.history.push(`/in-game/${queue}`)
        })
    }
    
    render(){
        return(
            <h1>Loading...</h1>
        )
    }
}

export default Loading