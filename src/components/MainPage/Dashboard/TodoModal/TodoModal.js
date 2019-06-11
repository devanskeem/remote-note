import React, { Component } from 'react'
import TodoItem from './TodoItem'
import './TodoModal.css'
import axios from 'axios'
import { updateTodos } from '../../../../redux/dataReducer'
import { connect } from 'react-redux';

export class TodoModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "Todo",
            todoItems: [],
            todoInput: '',
            show: false,
            closeButton: 'Close'
        }
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.title || this.state.content) {
            this.setState({
                closeButton: 'Save'
            })
        }
    }

    handleSave = () => {
        this.props.toggleTodoModal()

        if (this.state.todoItems.length) {
            const { user_id } = this.props.userReducer
            const { title, todoItems } = this.state
            axios.post('/todos/add', { user_id, title, items: todoItems }).then((res) => {
                const { todos } = this.props.dataReducer
                this.props.updateTodos([...todos, ...res.data])
                this.props.updateDashboard()
            })
                .catch(err => console.log(err))
        }

        this.setState({
            title: 'Todo',
            content: '',
            todoItems: [],
            todoInput: ''
        })
    }

    handleTodoAdd = () => {
        this.setState({
            todoItems: [...this.state.todoItems, this.state.todoInput],
            todoInput: '',
        })
        this.forceUpdate()
    }

    render() {
        let todoList = this.state.todoItems.map((todo, index) => {
            return (
                <li className='todoItem'>{todo}</li>
            )
        })

        return (
            <div className="modal-background">
                <div className='TodoModal'>
                    <section className="title">
                        <textarea value={this.state.title} name="title" type="text" className="title-input" placeholder='Title' onChange={this.handleInputChange} />
                    </section>

                    <section className="content">
                        <ul className='todoList'>
                            {todoList}
                        </ul>
                    </section>
                    <section className="input">
                        <input className='todoInput' type="text" value={this.state.todoInput} name='todoInput' placeholder='Add Item' onChange={this.handleInputChange} />
                        <button onClick={this.handleTodoAdd}>ADD</button>
                    </section>


                    <section className="todo-btns">
                        <div className="left-btns">
                            <button className="color-btn">color</button>
                            <button className="image-btn">image</button>
                            <button className="delete-btn">delete</button>
                        </div>
                        <div className="right-btns">
                            <button className="save-btn" onClick={this.handleSave}>{this.state.closeButton}</button>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

const mapDispatchToProps = {updateTodos}


export default connect(mapStateToProps, mapDispatchToProps)(TodoModal)
