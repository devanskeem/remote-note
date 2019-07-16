import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
function LandingHeader() {
    return (
        <div>
            <header className='landing-header'>
                <h1 className='title'>Remote Note</h1>
                <div className="nav">
                    <Link to='/login' className='link'>Login</Link>
                    <Link to='/register' className='link'>Register</Link>
                </div>
            </header>
        </div>
    )
}

export default LandingHeader
