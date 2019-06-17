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
            let phone = '';
            let creditsUsed = 0;
            if (!res.data === []) {
                 phone = res.data[0].phone_number
                 creditsUsed = res.data[0].credits_used
            }
            this.setState({
                phone,
                creditsUsed
            })
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
                            <input className='phone-input' type="number" placeholder='Phone Number' name='phone'/>
                            <TakeMoney phone={'+14352794599'} email={'dev@devan.com'} />
                        </div>
                    :
                        <div>

                            {this.state.updatePassword ?
                                <div>
                                    <input type="password" placeholder='New Password' onChange={e => this.setState({ password: e.target.value })} />
                                    <input type="password" placeholder='Confirm Password' onChange={e => this.setState({ passConfirm: e.target.value })} />
                                    <button onClick={this.handlePasswordUpdate}>Change Password</button>
                                </div>
                                :
                                <div>
                                    <input type="text" value={this.state.username} />
                                    <input type="text" value={this.state.firstname} />
                                    <input type="text" value={this.state.firstname} />

                                    {(this.state.premium) ?
                                        <div className="details">
                                            <div className='subscription'>
                                                <p>Subscription:</p>
                                                <p>Premium</p>
                                            </div>

                                            <div className="phone-number">
                                                <p>Phone Number:</p>
                                                <p>{this.state.phone}</p>
                                            </div>

                                            <div className="credits">
                                                <p>Credits Remaining:</p>
                                                <p>{250 - this.state.creditsUsed}</p>
                                            </div>
                                        </div>
                                        : <button onClick={this.toggleStripe}>Get Premium</button>
                                    }
                                    <button onClick={this.togglePasswordUpdate}>Change Password</button>
                                    <button onClick={this.handleUpdate}>Update</button>

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