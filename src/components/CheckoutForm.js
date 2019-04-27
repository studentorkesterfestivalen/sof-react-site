import React, {Component} from 'react';
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import { stripePurchase, stripeReset } from '../actions/shop';

import { connect } from 'react-redux';
import { Button } from '@rmwc/button';


const mapStateToProps = state => ({
  stripe_loading: state.shop.stripe_loading,
  stripe_complete: state.shop.stripe_complete,
  error: state.shop.stripe_error
})

// const mapDispatchToProps = dispatch => ({
//
// })

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentWillUnmount(){
    this.props.dispatch(stripeReset());
  }
  async submit(ev) {

    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token);
    this.props.dispatch(stripePurchase(token.id));

    // User clicked submit
  }
  Component
  render() {
    if (this.props.stripe_complete) return <h5> Purchase Complete </h5>;
    return (

        <div className="checkout" >
          <p>Would you like to complete the purchase?</p>

          <CardNumberElement />
          <CardExpiryElement />
          <CardCVCElement />

          <Button raised onClick={this.submit} disabled={this.props.stripe_loading}> Köp </Button>
        </div>

      );
    }
}

// stripe_loading: false,
// error
export default connect(mapStateToProps)(injectStripe(CheckoutForm));
