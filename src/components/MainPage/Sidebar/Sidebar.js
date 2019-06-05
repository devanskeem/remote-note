import React, { Component } from 'react'
import './Sidebar.css'
export class Sidebar extends Component {
    render() {
        return (
            <div className='Sidebar'>
                <div className="buttons">
                    <button id="new" onClick={this.props.toggleModal}>NEW</button>
                    <div className="line"></div>
                    <button>ALL</button>
                    <button>NOTES</button>
                    <button>REMINDERS</button>
                    <button>TODOS</button>
                </div>
            </div>
        )
    }
}

export default Sidebar
