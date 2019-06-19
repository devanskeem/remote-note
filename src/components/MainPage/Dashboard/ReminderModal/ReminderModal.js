import React, { Component } from 'react'
import './ReminderModal.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { updateReminders } from '../../../../redux/dataReducer'
export class NoteModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            remind_date: '',
            remind_time: '',
            remind_unix: null,
            closeButton: 'Close'
        }
    }

    componentDidMount = () => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        const date = new Date(Date.now() - tzoffset).toISOString()
        const  defaultDate = date.split('T', 1)[0] 
        const defaultTime = date.split('T', 2)[1].split(':', 2).join(':')
        this.setState({
            remind_date: defaultDate,
            remind_time: defaultTime
        })
        if(this.props.editing){
            this.setState({
                title: this.props.title,
            })
        }
    }
    handleInputChange = (e) => {
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
        if(this.state.title){
            let remind_unix = Date.parse(`${this.state.remind_date} ${this.state.remind_time}`)
            const { user_id } = this.props.userReducer
            const { title, remind_date, remind_time } = this.state
            if (!this.props.editing) {        
                
                axios.post('/reminders/add', { user_id, title, remind_unix, remind_date, remind_time }).then((res) => {
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
        }

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
        //formatting the date and time to use as default value for remind_date input
        return (
            <div className="modal-background" onClick={this.props.toggleReminderModal}>
                <div className='ReminderModal' onClick={e => e.stopPropagation()}>
                    <section className="title">
                        <input value={this.state.title} name="title" type="text" className="title-input" placeholder='Title' onChange={this.handleInputChange} />
                    </section>
                    <input type="date" name='remind_date' defaultValue={this.state.remind_date} onChange={this.handleInputChange}/>
                    <input type="time" name='remind_time' defaultValue={this.state.remind_time} onChange={this.handleInputChange}/>

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
