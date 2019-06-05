import React from 'react'
import "./LandingPage.css"
import {HashRouter, Link} from 'react-router-dom'
import routes from '../../routes'
function LandingPage() {
    return (
        <div className='LandingPage'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default LandingPage
