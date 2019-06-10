import React, { Component } from 'react'
import './TodoModal.css'
export class TodoItem extends Component {
    render() {
        return (
            <>
                <li className='todoItem'> 
                    {this.state.checked ? <div className='checked' onClick={this.toggleChecked}></div> : 
                    <div className='unchecked' onClick={this.toggleChecked}></div>}
                    {this.props.todo}
                </li>
            </>
        )
    }
}

export default TodoItem
