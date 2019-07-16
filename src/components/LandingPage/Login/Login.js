import React, { Component } from 'react'
import axios from 'axios'
import './Login.css'
import LandingHeader from '../LandingHeader'

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }
    handleLoginInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault()
        const { username, password } = this.state
        axios
            .post('/auth/login', { username, password })
            .then((res) => {
                this.props.history.push('/dashboard')
            })
            .catch(err => alert(err))
    }
    render() {
        return (
            <div className='login-page'>
                <LandingHeader />
                <div className='Login'>
                    <div className="login-form">
                        <h1 className='login-title'>Remote Note</h1>
                        <h3 className='login-name'>Log In</h3>
                        <form>
                            <input
                                type="text"
                                name='username'
                                placeholder='Username'
                                onChange={this.handleLoginInput}
                            />
                            <input
                                type="password"
                                name='password'
                                placeholder='Password'
                                onChange={this.handleLoginInput}
                            />
                            <button onClick={this.handleLogin}>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login

