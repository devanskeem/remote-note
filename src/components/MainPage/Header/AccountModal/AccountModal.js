import React, { Component } from 'react'
import axios from 'axios'
import { updateUser } from '../../../../redux/userReducer'
import { connect } from 'react-redux';
import './AccountModal.css'
import TakeMoney from '../StripeCheckout/StripeCheckout'

export class AccountModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: this.props.userReducer.username,
            firstname: this.props.userReducer.first_name,
            lastname: this.props.userReducer.last_name,
            premium: this.props.userReducer.premium,
            phone: '',
            creditsUsed: null,
            password: '',
            passConfirm: '',
            updatePassword: false,
            showStripe: false
        }
    }
    componentDidMount = () => {
        axios.get(`/auth/premium-details/${this.props.userReducer.user_id}`).then(res => {
            let phone = '+1';
            let creditsUsed = 0;
            if (res.data[0]) {
                phone = res.data[0].phone_number
                creditsUsed = res.data[0].credits_used
            }
            this.setState({
                phone,
                creditsUsed
            })
            this.forceUpdate();
        })
    }

    savePhoneNumber = (e) => {
        let phoneUpdated = e.target.value
        this.setState({
            phone: phoneUpdated
        })
    }

    togglePasswordUpdate = () => {
        this.setState({
            updatePassword: !this.state.updatePassword
        })
    }
    handlePasswordUpdate = () => {
        this.togglePasswordUpdate()
        const { username, password, passConfirm } = this.state
        axios.put('/auth/update-password', { username, password, passConfirm }).then(() => {
            this.setState({
                password: '',
                passConfirm: ''
            })
        })
    }

    toggleStripe = () => {
        this.setState({
            showStripe: !this.state.showStripe
        })
    }
    render() {
        return (
            <div className="modal-background" onClick={this.props.toggleModal}>
                <div className='AccountModal' onClick={e => e.stopPropagation()}>
                    {this.state.showStripe ?
                        <div className='get-premium-modal'>
                            <div className='phone-input-container'>
                                <p className='phone-number'>Phone Number:</p>
                                <input type="text" className="phone-input" name="phone"
                                    onChange={this.savePhoneNumber}
                                    defaultValue='+1' />
                                <small className='format'>numbers only</small>
                            </div>
                            <div className='side-by-side-btns'>
                                <button className='back-btn' onClick={this.toggleStripe}>Back</button>
                                <div className="take-money-btn">
                                    <TakeMoney toggleModal={this.props.toggleModal} phone={this.state.phone} />
                                </div>
                            </div>

                        </div>
                        :
                        <div>

                            {this.state.updatePassword ?
                                <div className='update-password-modal'>
                                    <input className='password-input' type="password" placeholder='New Password' onChange={e => this.setState({ password: e.target.value })} />
                                    <input className='password-input' type="password" placeholder='Confirm Password' onChange={e => this.setState({ passConfirm: e.target.value })} />
                                    <div className='side-by-side-btns'>
                                        <button className='back-btn' onClick={this.togglePasswordUpdate}>Back</button>
                                        <button className='change-password-button' onClick={this.handlePasswordUpdate}>Change Password</button>
                                    </div>
                                </div>
                                :
                                <div className='update-password-modal'>
                                    <p className='username'>Username: {this.state.username} </p>
                                    <p className='firstname'>First Name: {this.state.firstname}</p>
                                    <p className='lastname'>Last Name: {this.state.lastname}</p>

                                    {(this.state.premium) ?
                                        <div className="details">
                                            <p className='subscription'>Subscription: Premium</p>
                                            <p className="phone-number">Phone Number: {this.state.phone}</p>
                                            <p className="credits">Credits Remaining: {250 - this.state.creditsUsed}</p>
                                        </div>
                                        : <button className='get-premium-btn' onClick={this.toggleStripe}>Get Premium</button>
                                    }
                                    <button className='change-password-btn' onClick={this.togglePasswordUpdate} >Change Password</button>
                                </div>
                            }
                        </div>

                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

export default connect(mapStateToProps, { updateUser })(AccountModal)