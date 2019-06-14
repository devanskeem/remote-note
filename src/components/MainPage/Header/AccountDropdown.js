import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import AccountModal from './AccountModal/AccountModal'
import ThemeModal from './ThemeModal/ThemeModal'
export class AccountDropdown extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showAccountModal: false,
             showThemeModal: false
        }
    }

    toggleAccountModal = () => {
        this.setState({
            showAccountModal: !this.state.showAccountModal
        })
    }
    
    toggleThemeModal = () => {
        this.setState({
            showThemeModal: !this.state.showThemeModal
        })
    }
    
    handleLogout = () => {
        axios.get('/auth/logout').then(res => {
            this.props.history.push('/')
        })
    }
    render() {
        return (
            <div className='account-dropdown'>
                <button className='dropdown-btn' onClick={this.toggleAccountModal}>My Account</button>
                <button className='dropdown-btn' onClick={this.toggleThemeModal}>Theme</button>
                <button className='dropdown-btn' onClick={this.handleLogout}>Logout</button>
                {this.state.showAccountModal ? <AccountModal toggleModal={this.toggleAccountModal}/> : null}
                {this.state.showThemeModal ? <ThemeModal/> : null}
            </div>
        )
    }
}

export default withRouter(AccountDropdown)


