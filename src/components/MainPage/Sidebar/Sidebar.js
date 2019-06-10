import React, { Component } from 'react'
import './Sidebar.css'
import NewDropdown from './NewDropdown/NewDropdown'
import { updateCurrentDisplay } from '../../../redux/dataReducer'
import { connect } from 'react-redux'
export class Sidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showDropdown: false
        }
    }

    toggleDropdown = () => {
        this.setState({
            showDropdown: !this.state.showDropdown
        })
    }

    hideDropdown = () => {
        this.setState({
            showDropdown: false
        })
    }
    render() {
        const { notes, reminders, todos } = this.props.dataReducer
        return (
            <div className='Sidebar'>
                <div className="buttons">
                    <button id="new" onClick={this.toggleDropdown}>NEW</button>
                    {this.state.showDropdown ?
                        <NewDropdown
                            hideDropdown={this.hideDropdown}
                            toggleNoteModal={this.props.toggleNoteModal}
                            toggleReminderModal={this.props.toggleReminderModal}
                            toggleTodoModal={this.props.toggleTodoModal}
                        /> :
                        null
                    }
                    <div className="line"></div>
                    <button onClick={() => this.props.updateCurrentDisplay([...notes, ...reminders, ...todos])}>ALL</button>
                    <button onClick={() => this.props.updateCurrentDisplay(notes)}>NOTES</button>
                    <button onClick={() => this.props.updateCurrentDisplay(reminders)}>REMINDERS</button>
                    <button onClick={() => this.props.updateCurrentDisplay(todos)}>TODOS</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

const mapDispatchToProps = {
    updateCurrentDisplay
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)