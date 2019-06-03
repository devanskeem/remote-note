import React, { Component } from 'react'
import './LandingPage.css'
export class LandingPage extends Component {

    handleLogin = (e) => {
        e.preventDefault()
        this.props.history.push('/dashboard')
    }
    render() {
        return (
            <div className='LandingPage'>
                <div className="login">
                    <form>
                        <input type="text" name='username' placeholder='Username'/>
                        <input type="password" name='password' placeholder='Password'/>
                        <button onClick={this.handleLogin}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default LandingPage
