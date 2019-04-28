import React, { Component, forwardRef } from 'react';

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
import { CircularProgress } from '@rmwc/circular-progress';

import { injectIntl } from 'react-intl'

import posed from 'react-pose';

import { connect } from 'react-redux';

class OrderItemCard extends Component{
  render(){
    var cardContent = <div className='h-center' style={{width: '100%'}}><CircularProgress size="large" /> </div>;

    if(!this.props.isLoading && this.props.item !== null){
      const {prodID, amount} = this.props.item;
      // const baseProductIds = this.props.baseProducts[prodID];
      // const baseProduct = this.props.products[baseProductIds['base_id']];
      // const product = baseProduct.products[baseProductIds['prod_id']];

      const product = this.props.item;
      // const hasTypes = baseProduct.products.length > 1;
      cardContent =
        <React.Fragment>
          {(product.has_image) ?
              <CardMedia
                style={{ backgroundImage: 'url(' + product.image_path + ')'}}
              /> :
              null
          }
          <List nonInteractive className='product-list'>
            <ListItem ripple={false} style={{overflow: 'visible'}}>
              <ListItemText>
                {(true) ?
                  <React.Fragment>
                    <ListItemPrimaryText>
                      <b>
                        {product.name}
                      </b>
                    </ListItemPrimaryText>
                    <ListItemSecondaryText>
                      {product.kind}
                    </ListItemSecondaryText>
                  </React.Fragment>
                  :
                  <b>{product.name}</b>
                }
              </ListItemText>
            </ListItem>
          </List>
          <TextField outlined value={amount}
            label={this.props.intl.formatMessage({id: 'Cart.amount'})}
          />
          <List nonInteractive >
            <ListItem ripple={false} style={{overflow: 'visible'}}>
              <ListItemText>
                <b>
                  {product.cost + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
                </b>
              </ListItemText>
            </ListItem>
          </List>
        </React.Fragment>
    }


    return(
      <React.Fragment>
        <Card
            className='cart-item-card'
        >
          {cardContent}
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.orders.items,
  baseProducts: state.orders.items,
  isLoading: state.orders.loading
});

export default connect(mapStateToProps)(injectIntl(OrderItemCard));
