import React, { Component } from 'react'
import './Todo.css'

export class Todo extends Component {
    render() {
        return (
            <div className='Todo'>  
                <div className="contents">
                    <ol>
                        <li>Walk dog</li>
                        <li>Get groceries
                            <li>Milk</li>
                            <li>Bread</li>
                            <li>Cookies</li>
                        </li>
                        <li>Clean kitchen</li>
                    </ol>
                </div>
            </div>
        )
    }
}

export default Todo
