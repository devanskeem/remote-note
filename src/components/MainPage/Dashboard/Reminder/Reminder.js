import React, { Component } from 'react'
import './Reminder.css'
import {updateReminders, updateCurrentDisplay} from '../../../../redux/dataReducer'
import {connect} from 'react-redux'
import axios from 'axios'

export class Reminder extends Component {
    deleteReminder = () => {
        const {notes, reminders, todos} = this.props.dataReducer

        axios.delete(`/reminders/delete/${this.props.reminderId}`)
        axios.get(`/reminders/all/${this.props.userReducer.user_id}`)
        .then(res => {
            this.props.updateReminders(res.data) 
            this.props.updateDashboard();
        })
    }
    render() {
        return (
            <div className='Reminder'>
                <div className="contents">
                    <h3>{this.props.title}</h3>
                    <p>{this.props.date} </p>
                </div>
                <div className="reminder-buttons">
                    <button>edit</button>
                    <button onClick={this.deleteReminder}>delete</button>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

const mapDispatchToProps = {
    updateReminders,
    updateCurrentDisplay
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminder)
