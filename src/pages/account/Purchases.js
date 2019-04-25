import React, { Component } from 'react';

import OrderCard from '../../components/shop/OrderCard';

import { FormattedMessage, injectIntl } from 'react-intl'

import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import {connect} from 'react-redux';
import { setTitle } from '../../actions/title';

import QRCode from "qrcode.react";

const testOrders = [
  { klarna_order_id: 'bing_bong1233',
    date: (new Date()).toLocaleDateString(),
    articles: 15,
    price: 1337
  },
  { klarna_order_id: 'bing_bong1337',
    date: (new Date()).toLocaleDateString(),
    articles: 2,
    price: 9001
  },
  { klarna_order_id: 'bish_bashbosh',
    date: (new Date()).toLocaleDateString(),
    articles: 7,
    price: 25000
  },
]


const mapStateToProps = state => ({
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
});

class Purchases extends Component{

  constructor(props) {
    super(props);
  }

  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Dina köp";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  componentDidMount(){
    this.props.dispatch(setTitle('Account.purchases'));
  }
  

  render() {
    const orders = testOrders.map( order => (
      <GridCell desktop='6' tablet='8' phone='4' key={order.klarna_order_id}>
        <OrderCard order={order} />
      </GridCell>
    ));
    return(
      <GridInner>
        {orders}
      </GridInner>
    );
  }
}

export default injectIntl(connect(mapStateToProps)(Purchases));
