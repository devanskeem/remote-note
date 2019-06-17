import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { connect } from 'react-redux';


class TakeMoney extends React.Component {
  onToken = (token) => {
    
    axios.post('/stripe/subscribe', {
      stripeToken: token.id,
      email: this.props.email,
      user_id: this.props.userReducer.user_id,
      phone: this.props.phone
    }).then(res => {
      console.log('res', res)
    });
    
    
  }
 
  // ...
 
  render() {
    return (
      // ...
      <StripeCheckout
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