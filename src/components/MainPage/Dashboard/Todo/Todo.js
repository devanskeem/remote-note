import React, { Component } from 'react'
import './Todo.css'
import axios from 'axios'
import { updateTodos, updateCurrentDisplay } from '../../../../redux/dataReducer'
import { connect } from 'react-redux'

export class Todo extends Component {

    deleteTodo = () => {
        axios.delete(`/todos/delete/${this.props.todoId}`)
            .then(() => {
                axios.get(`/todos/all/${this.props.userReducer.user_id}`)
                    .then(res => {
                        this.props.updateTodos(res.data)
                        this.props.updateDashboard();
                    })
            })


    }
    render() {
        const { items } = this.props
        const todoList = items.map((item) => {
            return (
                <li className='list-item'><p>{item}</p></li>
            )
        })
        let listName = 'todoListDefault'
        if (items.length > 6) listName = 'todoListScroll'
        return (
            <div className='Todo'>
                <div className="todo-title">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="todo-contents">
                    <ul className={listName}>
                        {todoList}
                    </ul>
                </div>
                <div className="todo-buttons">
                    <button onClick={this.props.toggleTodoModal} >edit</button>
                    <button onClick={this.deleteTodo}>delete</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

const mapDispatchToProps = {
    updateTodos,
    updateCurrentDisplay
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
