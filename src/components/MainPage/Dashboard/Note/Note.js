import React, { Component } from 'react'
import './Note.css'
import {updateNotes, updateCurrentDisplay} from '../../../../redux/dataReducer'
import {connect} from 'react-redux'
import axios from 'axios'
export class Note extends Component {

    deleteNote = () => {
        axios.delete(`/notes/delete/${this.props.noteId}`).then(
            () => {
                axios.get(`/notes/all/${this.props.userReducer.user_id}`)
                .then(res => {
                    this.props.updateNotes(res.data) 
                    this.props.updateDashboard()
                })
            }
        )
    }
    render() {
        return (
            <div className='Note'>
                <div className="title">
                    <h1>{this.props.title}</h1>
                </div>

                <div className='note-content'>
                    <h3>{this.props.content}</h3>
                </div>
                <div className="note-buttons">
                    <button>edit</button>
                    <button onClick={this.deleteNote}>delete</button>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

const mapDispatchToProps = {
    updateNotes,
    updateCurrentDisplay
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)