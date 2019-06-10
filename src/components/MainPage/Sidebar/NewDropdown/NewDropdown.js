import React, { Component } from 'react'
import './NewDropdown.css'
export class NewDropdown extends Component {
    render() {
        return (
        <div className="dropdown-background" onClick={this.props.hideDropdown}>
            <div className='Dropdown'>
                <button id='drop-btn' onClick={this.props.toggleNoteModal}>NOTE</button>
                <button id='drop-btn' onClick={this.props.toggleReminderModal}>REMINDER</button>
                <button id='drop-btn' onClick={this.props.toggleTodoModal}>TODO</button>
            </div>
        </div>
        )
    }
}

export default NewDropdown
