import React, { Component } from 'react'
import axios from 'axios'
import './Register.css'
import LandingHeader from '../LandingHeader'
export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
        }
    }
    handleRegisterInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleRegister = (e) => {
        e.preventDefault()
        const { username, password, first_name, last_name } = this.state
        axios
            .post('/auth/register', { username, password, first_name, last_name })
            .then((res) => {
                this.props.history.push('/dashboard')
            })
            .catch(err => alert(err))
    }
    render() {
        return (
            <div className="register-page">
                <LandingHeader />
                <div className='Register'>
                    <div className="register-form">
                        <h1 className='register-title'>Remote Note</h1>
                        <h3 className="register-name">Register</h3>
                        <form>
                            <input
                                type="text"
                                name='username'
                                placeholder='Username'
                                onChange={this.handleRegisterInput}
                            />
                            <input
                                type="text"
                                name='first_name'
                                placeholder='First Name'
                                onChange={this.handleRegisterInput}
                            />
                            <input
                                type="text"
                                name='last_name'
                                placeholder='Last Name'
                                onChange={this.handleRegisterInput}
                            />
                            <input
                                type="password"
                                name='password'
                                placeholder='Password'
                                onChange={this.handleRegisterInput}
                            />
                            <button onClick={this.handleRegister}>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register
