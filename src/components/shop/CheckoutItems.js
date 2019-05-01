import React, {Component} from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux';

import {GridCell, GridInner} from '@rmwc/grid';

import OrderItemCard from './OrderItemCard';



const mapStateToProps = state => ({
  products: state.shop.products,
  baseProducts: state.shop.base_products

})

class CheckoutItems extends Component {
  render(){

    if( ! (Object.keys(this.props.items).length === 0 && this.props.items.constructor === Object))
    {
      let totCost = 0;
      for (const [key, value] of Object.entries(this.props.items)) {
        const baseProd = this.props.products[this.props.baseProducts[key].base_id];
        const productCost = baseProd.products[this.props.baseProducts[key].prod_id].actual_cost;
        totCost += productCost * value;
      }

      return (
        <React.Fragment>
            <h3>
              <FormattedMessage id='Shop.cart' />
            </h3>
            {Object.keys(this.props.items).map((key) => (
                <GridCell desktop='12' tablet='8' phone='4' key={key} >
                  <OrderItemCard
                    item={{product_id: key, amount: this.props.items[key]}}
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
