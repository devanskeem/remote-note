import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './Header.css'
import axios from 'axios'
import { updateCurrentDisplay } from '../../../redux/dataReducer'
import { connect } from 'react-redux'
export class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    
    handleLogout = () =>{
        axios.get('/auth/logout').then(res => {
            this.props.history.push('/')
        })
    }

    handleSearch = (e) => {
        let {notes, reminders, todos} = this.props.dataReducer
        let allData = [...notes, ...reminders, ...todos];
        let titleResult = allData.filter(element => { 
            return element.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        let noteResult = notes.filter(element => {
            return element.content.toLowerCase().includes(e.target.value.toLowerCase()) &&
            !element.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        let todoResult = []
        for (let i = 0; i < todos.length; i++){
            let filteredItems = todos[i].items.filter(element => element.toLowerCase().includes(e.target.value.toLowerCase()))
            if (filteredItems.length && !todos[i].title.toLowerCase().includes(e.target.value.toLowerCase())){
                todoResult.push(todos[i])
            }
        }
        this.props.updateCurrentDisplay([...titleResult, ...noteResult, ...todoResult])
    }
    render() {
        return (
            <div className='Header'>
                <span className="logo">
                    RemoteNote
                </span>
                <section className="search">
                    <input placeholder='Search' id="searchbar" type="text" onChange={this.handleSearch}/>
                </section>
                <span className="user-data">
                    <div className="profile"></div>                
                </span>
                <button className='logout-btn' onClick={this.handleLogout}>Logout</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))