import React from 'react'
import { io } from '../Socket'
import { Link } from 'react-router-dom'

class Loading extends React.Component{
    componentDidMount = () => {
        io.on('startGame', () => {
            this.props.history.push('/in-game')
        })
    }
    
    render(){
        return(
            <h1>Loading...</h1>
        )
    }
}

export default Loading