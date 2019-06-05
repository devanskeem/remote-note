import React, { Component } from 'react'
import './Note.css'
export class Note extends Component {
    render() {
        return (
            <div className='Note'>
                <div className="contents">
                    <h1>{this.props.title}</h1>
                    <h3>
                        {this.props.content}
                    </h3>
                </div>
            </div>
        )
    }
}

export default Note
