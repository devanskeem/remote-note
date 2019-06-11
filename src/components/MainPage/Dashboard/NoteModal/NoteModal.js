import React, { Component } from 'react'
import './NoteModal.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { updateNotes } from '../../../../redux/dataReducer'
export class NoteModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            content: '',
            show: false,
            closeButton: 'Close'
        }
    }
    componentDidMount() {
        if(this.props.editing){
            this.setState({
                
            })
        }
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.title || this.state.content){
            this.setState({
                closeButton: 'Save'
            })
        }
    }

    handleSave = () => {
        this.props.toggleNoteModal()
        let { notes } = this.props.dataReducer
        if (this.state.title || this.state.content){
            const { user_id } = this.props.userReducer
            const { title, content } = this.state
            axios.post('/notes/add', { user_id: user_id, title, content }).then((res) => {
                this.props.updateNotes([...notes, ...res.data])
                this.props.updateDashboard()
            })
                .catch(err => console.log(err))
        }

        this.setState({
            title: '',
            content: '',
        })
    }
    handleChildClick = (e) => {
        e.stopPropagation()
    }
    render() {
        return (
            <div className="modal-background"onClick={this.handleSave}>
                <div className='NoteModal' onClick={this.handleChildClick}>
                    <section className="title">
                        <textarea value={this.state.title} name="title" type="text" className="title-input" placeholder='Title' onChange={this.handleInputChange} />
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
