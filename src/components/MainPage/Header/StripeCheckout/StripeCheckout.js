import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { connect } from 'react-redux';


class TakeMoney extends React.Component {
  onToken = (token) => {
    this.props.toggleModal()
    console.log('this.props.phone', this.props.phone)
    axios.post('/stripe/subscribe', {
      stripeToken: token.id,
      user_id: this.props.userReducer.user_id,
      phone_number: this.props.phone
    })
  }
  
  render() {
    return (
      <StripeCheckout
        label='Get Premium'
        token={this.onToken}
        stripeKey="pk_test_uIjL3H2ALYIeSYDmjE2S9XnX00k6Pd0hnd"
      />
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}


export default connect(mapStateToProps)(TakeMoney)