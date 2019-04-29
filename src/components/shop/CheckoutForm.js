import React, {Component} from 'react';

import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import LoadButton from '../forms/components/LoadButton'
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import { stripePurchaseBegin, stripePurchase, stripeReset } from '../../actions/shop';

const mapStateToProps = state => ({
  stripe_loading: state.shop.stripe_loading,
  stripe_complete: state.shop.stripe_complete,
  error: state.shop.stripe_error
})



class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentWillUnmount(){
    this.props.dispatch(stripeReset());
  }

  async submit(ev) {
    this.props.dispatch(stripePurchaseBegin());
    let {token} = await this.props.stripe.createToken({name: "Name"});
    this.props.dispatch(stripePurchase(token.id));

  };
  render() {

    if (this.props.stripe_complete) return <h5> Purchase Complete </h5>;
    return (
        <div className="checkout" >
          <p>Would you like to complete the purchase?</p>
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4'>
              <CardNumberElement />
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2'>
              <CardExpiryElement />
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2'>
              <CardCVCElement />
            </GridCell>
          </GridInner>
          <LoadButton raised onClick={this.submit} loading={this.props.stripe_loading}> Köp </LoadButton>
        </div>

      );
    }
}

export default connect(mapStateToProps)(injectStripe(CheckoutForm));
