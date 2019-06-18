import React, { Component } from 'react'
import './ReminderModal.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { updateReminders } from '../../../../redux/dataReducer'
export class NoteModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Reminder',
            remind_date: null,
            remind_time: null,
            remind_unix: null,
            closeButton: 'Close'
        }
    }

    componentDidMount = () => {
        if(this.props.editing){
            this.setState({
                title: this.props.title,
            })
        }
    }
    handleInputChange = (e) => {
        console.log('this.state', this.state)
        if (!this.props.editing) {
            this.setState({
                closeButton: 'Save'
            })
        }
        else if(this.props.editing){
            this.setState({
                closeButton: 'Update'
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSave = () => {
        this.props.toggleReminderModal()
        let remind_unix = Date.parse(`${this.state.remind_date} ${this.state.remind_time}`)
        const { user_id } = this.props.userReducer
        const { title } = this.state
        if (!this.props.editing) {        
            
            axios.post('/reminders/add', { user_id, title, remind_unix }).then((res) => {
                this.props.updateReminders([...this.props.dataReducer.reminders, ...res.data])
                this.props.updateDashboard()
            }).catch(err => console.log('error:', err))
        }
        else if (this.props.editing){
            const {id} = this.props
            const {reminders} = this.props.dataReducer
            const currIndex = reminders.findIndex(reminder => reminder.reminder_id === id)
            const newReminders = reminders
            axios.put(`/reminders/update`, {reminder_id: id, title, remind_unix}).then(res => {
                newReminders.splice(currIndex, 1)
                newReminders.push(...res.data)
                this.props.updateReminders([...newReminders])
                this.props.updateDashboard()
            })
        }

        axios.post('/twilio/remind', {title, user_id, remind_unix})

        this.setState({
            title: '',
            remind_unix: null,
        })
    }

    handleDateChange = e => {
        if (!this.props.editing) {
            this.setState({
                closeButton: 'Save'
            })
        }
        else if(this.props.editing){
            this.setState({
                closeButton: 'Update'
            })
        }
    }


    render() {
        return (
            <div className="modal-background" onClick={this.props.toggleReminderModal}>
                <div className='ReminderModal' onClick={e => e.stopPropagation()}>
                    <section className="title">
                        <input value={this.state.title} name="title" type="text" className="title-input" placeholder='Title' onChange={this.handleInputChange} />
                    </section>
                    <input type="date" name='remind_date' onChange={this.handleInputChange}/>
                    <input type="time" name='remind_time' onChange={this.handleInputChange}/>

                    <section className="reminder-btns">
                        <div className="left-btns">
                            <button className="color-btn">change color</button>
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

const mapDispatchToProps = { updateReminders }

export default connect(mapStateToProps, mapDispatchToProps)(NoteModal)
