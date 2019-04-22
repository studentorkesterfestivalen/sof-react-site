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

import { injectIntl } from 'react-intl'

import posed from 'react-pose';

import { connect } from 'react-redux';

class CardItemCard extends Component{
  add = (id) => {
    if (this.props.addCallback){
      this.props.addCallback(id)
    }
  }

  remove = (id) => {
    if (this.props.removeCallback){
      this.props.removeCallback(id)
    }
  }

  render(){
    const {prodID, amount} = this.props.item;
    const baseProductIds = this.props.baseProducts[prodID];
    const baseProduct = this.props.products[baseProductIds['base_id']];
    const product = baseProduct.products[baseProductIds['prod_id']];

    const hasTypes = baseProduct.products.length > 1;
    return(
      <React.Fragment>
        <Card 
          className='cart-item-card' 
        >
          {(baseProduct.has_image) ?
              <CardMedia
                style={{ backgroundImage: 'url(' + baseProduct.image_path + ')'}}
              /> :
              null
          }
          <List nonInteractive className='product-list'>
            <ListItem ripple={false} style={{overflow: 'visible'}}>
              <ListItemText>
                {(hasTypes) ?
                  <React.Fragment>
                    <ListItemPrimaryText>
                      <b>
                        {baseProduct.name}
                      </b>
                    </ListItemPrimaryText>
                    <ListItemSecondaryText>
                      {product.kind}
                    </ListItemSecondaryText>
                  </React.Fragment>
                  :
                  <b>{baseProduct.name}</b>
                }
              </ListItemText>
            </ListItem>
          </List>
          <IconButton icon='remove' onClick={() => this.remove(prodID)} />
          <TextField outlined value={amount}
            onChange={(e) => this.handleChange(prodID, e.target)} label='Mängd'
          />
          <IconButton icon='add' onClick={() => this.add(prodID)} />
          <List nonInteractive twoLine>
            <ListItem ripple={false} style={{overflow: 'visible'}}>
              <ListItemText>
                <ListItemPrimaryText>
                  <b>
                      {product.actual_cost + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
                  </b>
                </ListItemPrimaryText>
                <ListItemSecondaryText style={{color: '#F00'}}>
                  1000+ kvar
                </ListItemSecondaryText>
              </ListItemText>
            </ListItem>
          </List>

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

export default connect(mapStateToProps)(injectIntl(CardItemCard));

