import React, {Component} from 'react';
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import { createStripePayment } from '../api/shopCalls';
import { resetCart } from '../actions/cart';

import { connect } from 'react-redux'
import { Button } from '@rmwc/button';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    createStripePayment(token.id)
    .then(response => {
      this.setState({complete:true})
      this.props.dispatch(resetCart());
    })
    .catch(error => {
      console.log(error);
    })
    // User clicked submit
  }

  render() {
    if (this.state.complete) return <h5> Purchase Complete </h5>;
    return (

        <div className="checkout" >
          <p>Would you like to complete the purchase?</p>
          <CardNumberElement />
          <CardExpiryElement />
          <CardCVCElement />

          <Button raised onClick={this.submit}>Köp</Button>
        </div>

      );
    }
}


export default connect()(injectStripe(CheckoutForm));
