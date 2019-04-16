import React, { Component, forwardRef } from 'react';

import {
  Card,
  CardMedia,
} from '@rmwc/card';

import { Ripple } from '@rmwc/ripple';

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
} from '@rmwc/list';
import { TextField } from '@rmwc/textfield';
import { IconButton } from '@rmwc/icon-button';
import { FormattedMessage, injectIntl } from 'react-intl'

import posed from 'react-pose/lib/index';

const test_articles = [
  {name: 'Biljett - Torsdag', description: 'hi hello my name is a text that explains this product', cost: 1337, id: 0, imageURL:'https://www.eventwristbands.com/images/products/7616.png' },
  {name: 'Biljett - Fredag', description: 'Hejsan hoppsan en sådan grej, hipp hurra och hej', cost: 42, id: 1, imageURL: 'https://www.wristband.com/getmedia/00c5dd96-7d96-4330-a1cf-a91ffe02fd05/tyvek.png.aspx'},
  {name: 'Biljett - Lördag', description: 'Tagga SOF!', cost: 9001, id: 2, imageURL: 'https://images-na.ssl-images-amazon.com/images/I/615mvW2E03L._SX425_.jpg'},
  {name: 'Biljett - Helhelg', description: 'bing bing bong', cost: 13, id: 3, imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCmVgAlNz8TvpImvL_-UusOPUtbM-ym-o0vcp2V0fQFDjeYpXQSQ'},
  {name: 'Märke', description: 'Visa bandeeen', cost: 3.14, id: 4, imageURL: 'https://cdn.shopify.com/s/files/1/1275/7969/products/pretty-useful-co-send-noods-patch_1024x.jpg?v=1517845970'},
]

class CardItemCard extends Component{
  constructor(props){
    super(props)
  }

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

  handleChange = (id, target) => {
    if (this.props.handleChangeCallback){
      this.props.handleChangeCallback(id, target);
    }
  }

  render(){
    console.log(this.props.item);
    const {prodID, quantity} = this.props.item;
    const item = test_articles[prodID];
    return(
      <React.Fragment>
        <Card 
          className='cart-item-card' 
        >
          <CardMedia
            style={{ backgroundImage: 'url(' + item.imageURL + ')'}}
          />
          <List nonInteractive >
            <ListItem ripple={false} style={{overflow: 'visible'}}>
              <ListItemText>
                {item.name}
              </ListItemText>
            </ListItem>
          </List>
          <IconButton icon='remove' onClick={() => this.remove(prodID)} />
          <TextField outlined value={quantity}
            onChange={(e) => this.handleChange(prodID, e.target)} label='Mängd'
          />
          <IconButton icon='add' onClick={() => this.add(prodID)} />
          <List nonInteractive >
            <ListItem ripple={false} style={{overflow: 'visible'}}>
              <ListItemText>
                  {item.cost + ' Kr'}
              </ListItemText>
            </ListItem>
          </List>

        </Card>
      </React.Fragment>
    );
  }
}

export default injectIntl(CardItemCard);

