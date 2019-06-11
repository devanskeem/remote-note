import React, { Component } from 'react'
import './ReminderModal.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { updateNotes, updateReminders } from '../../../../redux/dataReducer'
import DateTimePicker from "react-datetime-picker";
export class NoteModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            remind_date: new Date(),
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
        this.props.toggleReminderModal()
        if (this.state.title) {            
            const { user_id } = this.props.userReducer
            const { title, remind_date } = this.state
            axios.post('/reminders/add', { user_id, title, remind_date }).then((res) => {
                this.props.updateReminders([...this.props.dataReducer.reminders, ...res.data])
                this.props.updateDashboard()
            }).catch(err => console.log('error:', err))
        }

        this.setState({
            title: '',
            remind_date: new Date(),
        })
    }

    onDateChange = remind_date => {
        this.setState({ remind_date })
    }

    render() {
        return (
            <div className="modal-background">
                <div className='ReminderModal'>
                    <section className="title">
                        <textarea value={this.state.title} name="title" type="text" className="title-input" placeholder='Title' onChange={this.handleInputChange} />
                    </section>

                    <DateTimePicker 
                        onChange={this.onDateChange}
                        value={this.state.remind_date}
                        disableClock={true}
                    />
                    
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

const mapDispatchToProps = { updateNotes, updateReminders }

export default connect(mapStateToProps, mapDispatchToProps)(NoteModal)
