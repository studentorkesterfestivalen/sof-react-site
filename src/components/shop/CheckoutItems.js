import React, {Component} from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux';

import {GridCell, GridInner} from '@rmwc/grid';

import OrderItemCard from './OrderItemCard';



const mapStateToProps = state => ({
  items : state.cart.cart
})

class CheckoutItems extends Component {
  render(){

    if (this.props.items !== null)
    {
      let totCost = 0;
      // this.props.items.order_items.forEach( item =>{
        // const baseProd = this.props.products[this.props.baseProducts[order.prodID].base_id];
        // const productCost = baseProd.products[this.props.baseProducts[order.prodID].prod_id].actual_cost;

        // totCost += item.cost * item.amount // order.amount
      // });
      return (
        <React.Fragment>
            <h3>
              <FormattedMessage id='Shop.cart' />
            </h3>
            {Object.keys(this.props.items).map((key) => (
                <GridCell desktop='12' tablet='8' phone='4' key={key} >
                  <OrderItemCard
                    item={this.props.items[key]}
                  />
                </GridCell>
              ))}
              
            <h5>
              <FormattedMessage id='Shop.total' />: {totCost + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
            </h5>
        </React.Fragment>

      );
    }
    else{
      return (
        <React.Fragment>
          <h3>
            No items to checkout.
          </h3>
        </React.Fragment>
      );
    }
  }
}

export default connect(mapStateToProps)(injectIntl(CheckoutItems));
