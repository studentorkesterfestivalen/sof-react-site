import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { createStripePayment } from '../api/shopCalls';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    createStripePayment(token.id)
    .then(response => {
      this.setState({complete:true})
    })


    // User clicked submit
  }

  render() {
    if (this.state.complete) return <h1> Purchase Complete </h1>;
    return (

        <div className="checkout" style={{width:'100%'}}>
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Send</button>
        </div>
      );
    }
}

export default injectStripe(CheckoutForm);
