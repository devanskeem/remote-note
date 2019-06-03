import React, { Component } from 'react'
import './Reminder.css'

export class Reminder extends Component {
    render() {
        return (
            <div className='Reminder'>
                <div className="contents">
                    <h3>Take out the garbage</h3>
                    <p>Thursday, May 23rd at 9:00am </p>
                </div>
            </div>
        )
    }
}

export default Reminder
