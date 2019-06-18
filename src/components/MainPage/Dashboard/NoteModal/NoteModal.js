import React, { Component } from 'react'
import './NoteModal.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { updateNotes } from '../../../../redux/dataReducer'
export class NoteModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Note',
            content: '',
            closeButton: 'Close'
        }
    }

    componentDidMount = () => {
        if(this.props.editing){
            this.setState({
                title: this.props.title,
                content: this.props.content
            })
        }
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.content && !this.props.editing){
            this.setState({
                closeButton: 'Save'
            })
        }
        else if(this.state.content && this.props.editing){
            this.setState({
                closeButton: 'Update'
            })
        }
    }

    handleSave = () => {
        this.props.toggleNoteModal()
        let { notes } = this.props.dataReducer
        if ((this.state.content) && !this.props.editing){
            const { user_id } = this.props.userReducer
            const { title, content } = this.state
            axios.post('/notes/add', { user_id: user_id, title, content }).then((res) => {
                this.props.updateNotes([...notes, ...res.data])
                this.props.updateDashboard()
            })
                .catch(err => console.log(err))
        }

        else if (this.props.editing){
            const {id} = this.props
            const {title, content} = this.state
            const {notes} = this.props.dataReducer
            const currIndex = notes.findIndex(note => note.note_id === id)
            const newNotes = notes
            axios.put(`/notes/update`, {note_id: id, title, content}).then(res => {
                newNotes.splice(currIndex, 1)
                newNotes.push(...res.data)
                this.props.updateNotes([...newNotes])
                this.props.updateDashboard()
            })
        }

        this.setState({
            title: '',
            content: '',
        })
    }
    render() {
        return (
            <div className="modal-background" 
            onClick={this.props.toggleNoteModal}>
                <div className='NoteModal' onClick={e => e.stopPropagation()}>
                    <section className="title">
                        <input value={this.state.title} name="title" type="text" className="title-input" placeholder='Title' onChange={this.handleInputChange} />
                    </section>

                    <section className="content">
                        <textarea value={this.state.content} name="content" type="text" className="content-input" placeholder='Note' onChange={this.handleInputChange} />
                    </section>

                    <section className="note-btns">
                        <div className="left-btns">
                            <button className="color-btn">change color</button>
                            <button className="image-btn">add image</button>
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

const mapDispatchToProps = { updateNotes }

export default connect(mapStateToProps, mapDispatchToProps)(NoteModal)
