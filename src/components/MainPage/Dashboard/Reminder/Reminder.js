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
    handleEdit = () => {
        this.props.updateState(this.props.editing, this.props.title, '', this.props.date, [], this.props.reminderId)
        this.props.toggleReminderModal()
    }
    getDisplayDate = () => {
        if(this.props.date){
            let tempDate = new Date(`${this.props.date}T${this.props.time}Z`)
            tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset())
            const splitDate = tempDate.toString().split(' ', 5)
            let splitTime = splitDate[4].split(':', 2)            
            if (+splitTime[0] > 12){
                return `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]} @ ${+splitTime[0] - 12}:${splitTime[1]} PM`
            } else if (+splitTime[0] === 12){
                return `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]} @ ${splitTime[0]}:${splitTime[1]} PM`
            } else if (+splitTime[0] === 0) {
                return `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]} @ ${12}:${splitTime[1]} AM`
            }
            return `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]} @ ${+splitTime[0]}:${splitTime[1]} AM`
        }
    }
    render() {  
        return (
            <div className='Reminder'>
                <div className="contents">
                    <h3>{this.props.title}</h3>
                    <p>{this.getDisplayDate()} </p>
                </div>
                <div className="reminder-buttons">
                    <button onClick={this.handleEdit}>edit</button>
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
