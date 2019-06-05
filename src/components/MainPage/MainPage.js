import React, {Component} from 'react';
import './MainPage.css';
import Dashboard from './Dashboard/Dashboard'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar';

class MainPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showModal: false
    }
  }
  
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render(){
    return (
      <div className="MainPage">
          <header>
              <Header/>
          </header>
          <section className="main-body">
              <Dashboard toggleModal={this.toggleModal} showModal={this.state.showModal}/>
              <Sidebar toggleModal={this.toggleModal}/>
          </section>
      </div>
    );
  }
}

export default MainPage;