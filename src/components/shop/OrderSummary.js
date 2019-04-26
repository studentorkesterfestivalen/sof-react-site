import React, { Component, forwardRef } from 'react';

import OrderItemCard from './OrderItemCard';

import {
  Card,
  CardMedia,
} from '@rmwc/card';
import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';
import { TextField } from '@rmwc/textfield';
import { IconButton } from '@rmwc/icon-button';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';

import { FormattedMessage, injectIntl } from 'react-intl'

import posed from 'react-pose';

import { connect } from 'react-redux';

class OrderSummary extends Component{
  render(){
    var totCost = 0;
    if(!this.props.isLoading && this.props.products !== null) {
      console.log('here is a fuckuppy');
      console.log(this.props.products);
      console.log(this.props.baseProducts);
      this.props.order.items.forEach( order =>{
        const baseProd = this.props.products[this.props.baseProducts[order.prodID].base_id];
        const productCost = baseProd.products[this.props.baseProducts[order.prodID].prod_id].actual_cost;
        totCost += productCost * order.amount
      });
    }
    return(
      <React.Fragment>
        <Card className='order-summary'>
          <Grid style={{width: '100%'}}>
            <GridInner>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <b> Order </b> {this.props.order.id}
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4'>
              <ListDivider/>
            </GridCell>
              {this.props.order.items.map((orderItem) => (
                <GridCell desktop='12' tablet='8' phone='4' key={orderItem.prodID} >
                  <OrderItemCard 
                    item={orderItem} 
                  />
                </GridCell>
              ))}
            <GridCell desktop='12' tablet='8' phone='4'>
              <ListDivider/>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' style={{display: 'flex', justifyContent: 'space-between', margin: '0px 16px'}}>
              <b>
                <FormattedMessage id='Cart.total' />
              </b>
              <b>
              {totCost + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
              </b>
            </GridCell>
            </GridInner>
          </Grid>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.shop.products,
  baseProducts: state.shop.base_products,
  isLoading: state.shop.loading
});

export default connect(mapStateToProps)(injectIntl(OrderSummary));
