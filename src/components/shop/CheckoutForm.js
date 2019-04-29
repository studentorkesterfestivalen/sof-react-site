import React, {Component} from 'react';

import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import LoadButton from '../forms/components/LoadButton'
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import { stripePurchaseBegin, stripePurchase, stripeReset } from '../../actions/shop';
import { FormattedMessage, injectIntl } from 'react-intl'

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

    if (this.props.stripe_complete) return <h5> <FormattedMessage id='Shop.completed' />  </h5>;
    return (
        <div className="checkout" >
        <p><FormattedMessage id='Shop.complete_order' /></p>
          <GridInner>
            <GridCell desktop='6' tablet='4' phone='4'>
              <FormattedMessage id='Shop.card_number' />
              <CardNumberElement />
            </GridCell>
            <GridCell desktop='3' tablet='2' phone='2'>
              <FormattedMessage id='Shop.expiry_date' />
              <CardExpiryElement />
            </GridCell>
            <GridCell desktop='3' tablet='2' phone='2'>
              CVC <FormattedMessage id='Shop.code' />
              <CardCVCElement />
            </GridCell>
          </GridInner>
          <LoadButton raised onClick={this.submit} style={{width:'100%'}} loading={this.props.stripe_loading}>
            <FormattedMessage id='Shop.buy' />
           </LoadButton>
           <i><p style={{fontSize:'0.8rem', lineHeight: '1rem'}}>
            <FormattedMessage id='Shop.data_handling1' />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://stripe.com/"
                style={{color: "var(--mdc-theme-secondary)"}}
              >
                Stripe
              </a>
            <FormattedMessage id='Shop.data_handling2' />
            </p></i>
        </div>

      );
    }
}

export default connect(mapStateToProps)(injectStripe(CheckoutForm));
