import React, { Component } from 'react'
import './Header.css'
export class Header extends Component {
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
                    <img src="" alt="profile"/>
                </span>
            </div>
        )
    }
}

export default Header
