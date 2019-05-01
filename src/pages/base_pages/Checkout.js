import React, { Component } from 'react';

import ArticleCard from '../../components/page_components/ArticleCard';
import Klarna from '../../components/Klarna';

import { pushCart } from '../../actions/cart';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { withRouter } from 'react-router-dom';

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm  from '../../components/shop/CheckoutForm';
import CheckoutItems from '../../components/shop/CheckoutItems';
import { stripePublicKey } from '../../constants';

import { connect } from 'react-redux';

class Shop extends Component{
  constructor(props) {
    super(props);
    this.intl = this.props.intl;

    this.cart = this.props.items;
  };

  componentDidMount(){
    this.props.pushCart()

  }

  static pageTitle(){
    return <FormattedMessage id='Checkout.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Checkout.navTitle' />
  }
  render() {
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4' >
              <CheckoutItems items={this.cart}/>
            </GridCell>
            <StripeProvider apiKey='pk_test_W3XCnvak8xndoNRH2vcGAqzu'>
              <GridCell desktop='12' tablet='8' phone='4' >
               <div className="stripe example">
                 <h5><FormattedMessage id='Shop.payment' /></h5>
                 <Elements>
                   <CheckoutForm />
                 </Elements>
               </div>
              </GridCell>
            </StripeProvider>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  items : state.cart.cart

})

export default connect(mapStateToProps, {pushCart})(withRouter(injectIntl(Shop, { withRef: true })));
