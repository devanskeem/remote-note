import React, { Component } from 'react'
import axios from 'axios'
import './Dashboard.css'
import Note from './Note/Note'
import Reminder from './Reminder/Reminder'
import Todo from './Todo/Todo'
import NoteModal from './NoteModal/NoteModal'
import ReminderModal from './ReminderModal/ReminderModal';
import TodoModal from './TodoModal/TodoModal';
import {updateUser} from '../../../redux/userReducer'
import {updateNotes, updateReminders, updateTodos, updateCurrentDisplay} from '../../../redux/dataReducer'
import { connect } from 'react-redux';
export class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            screenWidth: 1201,
            editing: false,
            title: '',
            content: '',
            date: '',
            items: [],
            id: null
        }
    }

    resize = () => {
        this.setState({
            screenWidth: window.innerWidth
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
        axios.get('/auth/getUserData').then((res) => {
            this.props.updateUser(res.data)
            return res.data;
        }).then(data => {
            axios.get(`/notes/all/${data.user_id}`).then(res => {
                this.props.updateNotes(res.data)
            })
            .then(() => axios.get(`/reminders/all/${data.user_id}`))
            .then(res => {
                this.props.updateReminders(res.data)
            })
            .then(() => axios.get(`/todos/all/${data.user_id}`))
            .then((res) => {
                this.props.updateTodos(res.data)
            })
            .then(() => {
                this.updateDashboard()
            })
            
        });
    }
    updateDashboard = () => {
        const {notes, reminders, todos} = this.props.dataReducer
        this.props.updateCurrentDisplay([...notes, ...reminders, ...todos])
        this.setState({
            screenWidth: 1201,
            editing: false,
            title: '',
            content: '',
            date: '',
            items: [],
            id: null
        })

        this.forceUpdate()
    }

    updateState = (editing = true, title = '', content = '', date = '', items = '', id = null) => {
        this.setState({
            editing,
            title,
            content,
            date, 
            items,
            id
        })
    }
    getColumn(col){
        const {currentDisplay} = this.props.dataReducer
        let column = currentDisplay.map((element, index) => {
            if(this.state.screenWidth > 1200){
                if (index % 3 === (col - 1)){ //i used (column - 1) here because i am going by index not column#
                    if(element.note_id) return ( 
                        <Note 
                            key={element.note_id} 
                            title={element.title} 
                            content={element.content}
                            noteId={element.note_id} 
                            updateDashboard={this.updateDashboard}
                            toggleNoteModal={this.props.toggleNoteModal}
                            updateState={this.updateState}
                        />)

                    else if(element.reminder_id) return (
                        <Reminder 
                            key={element.reminder_id} 
                            title={element.title} 
                            content={element.content} 
                            date={element.remind_date}
                            time={element.remind_time}
                            reminderId={element.reminder_id} 
                            updateDashboard={this.updateDashboard}
                            toggleReminderModal={this.props.toggleReminderModal}
                            updateState={this.updateState}
                        />)

                    else if(element.todo_id) return (
                        <Todo 
                            key={element.todo_id} 
                            todoId={element.todo_id} 
                            title={element.title} 
                            items={element.items}
                            toggleTodoModal={this.props.toggleTodoModal} 
                            todoId={element.todo_id} 
                            updateDashboard={this.updateDashboard}
                            updateState={this.updateState}
                        />)
                }
            } else if(col === 1){
                    if(element.note_id) return( 
                        <Note 
                            key={element.note_id} 
                            title={element.title} 
                            content={element.content}
                            noteId={element.note_id} 
                            updateDashboard={this.updateDashboard}
                            toggleNoteModal={this.props.toggleNoteModal}
                            updateState={this.updateState}
                            />)

                    else if(element.reminder_id) return( 
                        <Reminder 
                            key={element.reminder_id} 
                            title={element.title} 
                            content={element.content} 
                            date={element.remind_date}
                            time={element.remind_time}
                            reminderId={element.reminder_id} 
                            updateDashboard={this.updateDashboard}
                            toggleReminderModal={this.props.toggleReminderModal}
                            updateState={this.updateState}
                        />)

                    else if(element.todo_id) return( 
                        <Todo 
                            key={element.todo_id} 
                            title={element.title} 
                            todoId={element.todo_id} 
                            items={element.items} 
                            toggleTodoModal={this.props.toggleTodoModal} 
                            updateDashboard={this.updateDashboard}
                            updateState={this.updateState}
                        />)
            }
        })
        return column;
    }
    render() {
        return (
            <div className='Dashboard'>
                {this.props.showNoteModal ? 
                <NoteModal 
                    toggleNoteModal={this.props.toggleNoteModal}   
                    updateDashboard={this.updateDashboard}    
                    editing={this.state.editing}
                    title={this.state.title}
                    content={this.state.content}
                    id={this.state.id}
                /> :
                null
                }
                {this.props.showReminderModal ? 
                <ReminderModal  
                    toggleReminderModal={this.props.toggleReminderModal}  
                    updateDashboard={this.updateDashboard}
                    editing={this.state.editing}
                    title={this.state.title}
                    date={this.state.date}
                    id={this.state.id}
                /> :
                null
                }
                {this.props.showTodoModal ? 
                <TodoModal 
                    toggleTodoModal={this.props.toggleTodoModal}      
                    updateDashboard={this.updateDashboard}  
                    editing={this.state.editing}
                    title={this.state.title}
                    items={this.state.items}
                    id={this.state.id}
                /> :
                null
                }
                <section className="dashboard-content">
                    <section className="column">
                        {this.getColumn(1)}
                    </section>
                    <section className="column">
                        {this.getColumn(2)}
                    </section>
                    <section className="column">
                        {this.getColumn(3)} 
                    </section>
                </section>
            </div>
        )
    }
}
function mapStateToProps(reduxState) {
    return reduxState
}

const mapDispatchToProps = {updateUser, updateNotes, updateReminders, updateTodos, updateCurrentDisplay}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)