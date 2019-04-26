import React, { Component } from 'react';

import ArticleCard from '../../components/page_components/ArticleCard';
import Klarna from '../../components/Klarna';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { withRouter } from 'react-router-dom';

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../../components/CheckoutForm';

class Shop extends Component{
  constructor(props) {
    super(props);
    this.intl = this.props.intl;

  };

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
            <StripeProvider apiKey="pk_test_W3XCnvak8xndoNRH2vcGAqzu">
              <GridCell desktop='12' tablet='8' phone='4' >
               <div className="example">
                 <h1>React Stripe Elements Example</h1>
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

export default withRouter(injectIntl(Shop, { withRef: true }));
