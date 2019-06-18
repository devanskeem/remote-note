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
        if (e.target.name === 'remind_date' || e.target.name === 'remind_time'){
            console.log('hello')
        }
        this.setState({
            [e.target.name]: e.target.value
        })
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

    handleSave = () => {
        let newDate = Date.parse(`${this.state.remind_date} ${this.state.remind_time}`)
        console.log(new Date(newDate - (1000 * 60 * 60 * 6)).toUTCString())
        console.log(new Date())
        if (!this.props.editing) {        
            const { user_id } = this.props.userReducer
            const { title, remind_date } = this.state
            axios.post('/reminders/add', { user_id, title, remind_date }).then((res) => {
                this.props.updateReminders([...this.props.dataReducer.reminders, ...res.data])
                this.props.updateDashboard()
            }).catch(err => console.log('error:', err))
        }
        else if (this.props.editing){
            const {id} = this.props
            const {title, remind_date} = this.state
            const {reminders} = this.props.dataReducer
            const currIndex = reminders.findIndex(reminder => reminder.reminder_id === id)
            const newReminders = reminders
            axios.put(`/reminders/update`, {reminder_id: id, title, remind_date}).then(res => {
                newReminders.splice(currIndex, 1)
                newReminders.push(...res.data)
                this.props.updateReminders([...newReminders])
                this.props.updateDashboard()
            })
        }

        this.setState({
            title: '',
            remind_date: new Date(),
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
            <div className="modal-background">
                <div className='ReminderModal'>
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
