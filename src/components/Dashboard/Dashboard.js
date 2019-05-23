import React, { Component } from 'react'
import './Dashboard.css'
import Header from '../Header/Header'
import Note from '../Note/Note'

export class Dashboard extends Component {
    render() {
        return (
            <div className='Dashboard'>
                <header className="header">
                    <Header/>
                </header>
                <section className="dashboard">
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                </section>
            </div>
        )
    }
}

export default Dashboard
