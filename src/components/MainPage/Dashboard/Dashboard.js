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
        }
    }
    resize = () => {
        this.setState({
            screenWidth: window.innerWidth
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
        console.log('this.props', this.props)
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
                let {notes, reminders, todos} = this.props.dataReducer
                console.log('yooo',this.props)
                this.props.updateCurrentDisplay([...notes, ...reminders, ...todos])
            })
            
        });
    }

    // updateCurrentDisplay = (notes = this.props.dataReducer.notes, reminders = this.props.dataReducer.reminders, todos = this.props.dataReducer.todos) => {
    //     this.props.updateNotes(notes)
    //     this.props.updateReminders(reminders)
    //     this.props.updateTodos(todos)
        
    //     this.setState({
    //         currentDisplay: sorted 
    //     }) 
    // }
    //this function take in a column parameter between 1 and 3 and returns the jsx for that column
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

                        />)

                    else if(element.reminder_id) return (
                        <Reminder 
                            key={element.reminder_id} 
                            title={element.title} 
                            content={element.content} 
                            date={element.remind_date}
                            reminderId={element.reminder_id} 

                        />)

                    else if(element.todo_id) return (
                        <Todo 
                            key={element.todo_id} 
                            title={element.title} 
                            todoId={element.todo_id} 
                            items={element.items}
                            toggleTodoModal={this.props.toggleTodoModal} 
                            todoId={element.todo_id} 

                        />)
                }
            } else if(col === 1){
                    if(element.note_id) return( 
                        <Note 
                            key={element.note_id} 
                            title={element.title} 
                            content={element.content}
                            noteId={element.note_id}
                            />)

                    else if(element.reminder_id) return( 
                        <Reminder 
                            key={element.reminder_id} 
                            title={element.title} 
                            content={element.content} 
                            date={element.remind_date}
                            reminderId={element.reminder_id} 

                        />)

                    else if(element.todo_id) return( 
                        <Todo 
                            key={element.reminder_id} 
                            title={element.title} 
                            todoId={element.todo_id} 
                            items={element.items} 
                            toggleTodoModal={this.props.toggleTodoModal} 
                        />)
            }
        })
        return column;
    }
    render() {
        console.log(this.props)
        return (
            <div className='Dashboard'>
                {this.props.showNoteModal ? 
                <NoteModal toggleNoteModal={this.props.toggleNoteModal}/> :
                null
                }
                {this.props.showReminderModal ? 
                <ReminderModal  toggleReminderModal={this.props.toggleReminderModal}/> :
                null
                }
                {this.props.showTodoModal ? 
                <TodoModal toggleTodoModal={this.props.toggleTodoModal}/> :
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
