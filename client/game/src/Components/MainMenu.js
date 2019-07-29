import React from 'react'
import {Link} from 'react-router-dom'
import { io } from '../Socket'

class MainMenu extends React.Component{

    componentDidMount = () => {
        let queueBtn = document.querySelector('.queue-btn')
        queueBtn.addEventListener('click', () => {
            io.emit('findQueue', res => {
                console.log("back")
            })
        })
    }

    render(){
        return(
            <div>
                <h1>Main Menu</h1>
                <a className="queue-btn"><Link to="loading-screen">Queue Up</Link></a>
            </div>
        )
    }
}

export default MainMenu