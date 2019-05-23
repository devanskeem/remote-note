import React, { Component } from 'react'
import './Header.css'
export class Header extends Component {
    render() {
        return (
            <div className='Header'>
                <section className="search">
                    <input placeholder='Search' id="searchbar" type="text" />
                </section>
            </div>
        )
    }
}

export default Header
