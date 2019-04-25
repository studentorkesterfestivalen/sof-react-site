import React, { Component, forwardRef } from 'react';

import {
  Card,
  CardMedia,
  CardPrimaryAction
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
import { CircularProgress } from '@rmwc/circular-progress';
import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { injectIntl } from 'react-intl'

import posed from 'react-pose';

import { connect } from 'react-redux';

class OrderCart extends Component{

  render(){
    const {order} = this.props;

    return(
      <React.Fragment>
        <Card 
          className='order-card' 
        >
          <CardPrimaryAction>
            <Grid>
              <GridInner>
                <GridCell desktop='6' tablet='4' phone='2'>
                  <b> Order </b> {order.klarna_order_id}
                </GridCell>
                <GridCell desktop='6' tablet='4' phone='2' style={{textAlign: 'right'}}>
                  {order.date}
                </GridCell>
                <GridCell desktop='6' tablet='4' phone='2'>
                  {order.articles + (this.props.intl.locale === 'sv' ? ' artiklar' : " articles")}
                </GridCell>
                <GridCell desktop='6' tablet='4' phone='2' style={{textAlign: 'right'}}>
                  {order.price + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
                </GridCell>
              </GridInner>
            </Grid>
          </CardPrimaryAction>
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

export default connect(mapStateToProps)(injectIntl(OrderCart));

