import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './Header.css'
import axios from 'axios'
export class Header extends Component {
    handleLogout = () =>{
        axios.get('/auth/logout').then(res => {
            this.props.history.push('/')
        })
    }
    render() {
        return (
            <div className='Header'>
                <span className="logo">
                    RemoteNote
                </span>
                <section className="search">
                    <input placeholder='Search' id="searchbar" type="text" />
                </section>
                <span className="user-data">
                    <div className="profile"></div>                
                </span>
                <button className='logout-btn' onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default withRouter(Header)
