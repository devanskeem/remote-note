import React, { Component } from 'react';
import './MainPage.css';
import Dashboard from './Dashboard/Dashboard'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar';

class MainPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showNoteModal: false,
      showReminderModal: false,
      showTodoModal: false
    }
  }

  toggleNoteModal = () => {
    this.setState({
      showNoteModal: !this.state.showNoteModal
    })
  }

  toggleReminderModal = () => {
    this.setState({
      showReminderModal: !this.state.showReminderModal
    })
  }

  toggleTodoModal = () => {
    this.setState({
      showTodoModal: !this.state.showTodoModal
    })
  }
  render() {
    return (
      <div className="MainPage">
        <header>
          <Header />
        </header>
        <section className="main-body">
          <Dashboard 
            toggleNoteModal={this.toggleNoteModal} 
            showNoteModal={this.state.showNoteModal}
            toggleReminderModal={this.toggleReminderModal} 
            showReminderModal={this.state.showReminderModal} 
            toggleTodoModal={this.toggleTodoModal} 
            showTodoModal={this.state.showTodoModal} 
           />
          <Sidebar toggleNoteModal={this.toggleNoteModal} toggleReminderModal={this.toggleReminderModal} toggleTodoModal={this.toggleTodoModal}/>
        </section>
      </div>
    );
  }
}

export default MainPage;