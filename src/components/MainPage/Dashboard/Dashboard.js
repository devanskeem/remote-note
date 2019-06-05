import React, { Component } from 'react'
import axios from 'axios'
import './Dashboard.css'
import Note from './Note/Note'
import Reminder from './Reminder/Reminder'
import Todo from './Todo/Todo'
import NoteModal from './NoteModal/NoteModal'
import {updateUser} from '../../../redux/userReducer'
import {updateNotes, updateReminders} from '../../../redux/dataReducer'
import { connect } from 'react-redux';
export class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             currentDisplay: []
        }
    }
    componentDidUpdate(prevProps){
        console.log('prevProps')
       if (prevProps !== this.props) console.log('updating')
    }
    componentDidMount() {
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
            .then(() => {
                let {notes, reminders, todos} = this.props.dataReducer
                this.updateCurrentDisplay(notes, reminders, todos)
            })
            
        });
    }

    updateCurrentDisplay = (notes, reminders, todos) => {
        console.table(notes)
        this.props.updateNotes(notes)
        this.props.updateReminders(reminders)
        const sorted = [...notes, ...reminders, ...todos].sort((a, b) => {
            return a.timestamp > b.timestamp ? -1 : 1
        })
        this.setState({
            currentDisplay: sorted
        })        
    }
    //this function take in a column parameter between 1 and 3 and returns the jsx for that column
    getColumn(col){
        const {currentDisplay} = this.state
        let column = currentDisplay.map((element, index) => {
            if (index % 3 === (col - 1)){ //i used (column - 1) here because i am going by index not column
                return <Note key={index} title={element.title} content={element.content}/>
            }
        })
        return column;
    }
    render() {
        {console.log(this.props.showModal)}
        return (
            <div className='Dashboard'>
                {this.props.showModal ? 
                <NoteModal updateDisplay={this.updateCurrentDisplay} toggleModal={this.props.toggleModal}/> :
                <>
                
                </>
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

const mapDispatchToProps = {updateUser, updateNotes, updateReminders}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
