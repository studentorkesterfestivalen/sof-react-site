import React, { Component } from 'react';

import { ListDivider } from '@rmwc/list';
import {
  Card,
  CardMedia,
  CardPrimaryAction,
  CardActionButton,
  CardActionIcon,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '@rmwc/card';
import{
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';
import { Button } from '@rmwc/button';
import { Icon } from '@rmwc/icon';
import { Select } from '@rmwc/select';

import { FormattedMessage, injectIntl } from 'react-intl'

import { connect } from 'react-redux';

class ArticleCard extends Component{
  constructor(props){
    super(props)

    this.state = {type: null};
  }

  render(){
    const article = this.props.article;
    const isSelection = article.products.length > 1
    return(
      <React.Fragment>
        <Card style={{ width: '100%', height: '100%', position: 'relative' }} >
          {(article.has_image) ?
              <CardMedia
                sixteenByNine
                style={{
                  backgroundImage:
                  'url(' + article.image_path + ')'
                }}
              /> :
              null
          }
          <div style={{ padding: '1rem' }}>
            <h4 style={{ margin: '0px'}}>
              {article.name}
            </h4>
            <p style={{marginBottom: '0px'}}>
              {article.description}
            </p>
          </div>
          <div style={{flexGrow: '1'}} />
          <ListDivider/>
            { isSelection ?
                <Select 
                  label={this.props.intl.formatMessage({id: 'Shop.type'})}
                  options={article.products.map((prod,id) => {return {label: prod.kind, value: id, key: id}})} 
                  onChange={(e) => this.setState({type: e.target.value})}
                /> 
                : null
            }
          <div style={{height: '72px'}}/>
          <CardActions style={{position: 'absolute', bottom: '0px', width: '100%', padding: '16px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <h6 style={{margin: '0', height: '31px'}}>
              <b>
                {isSelection ? 
                  this.state.type !== null ? article.products[this.state.type].actual_cost : '-'
                  : article.cost
                }
                {(!isSelection || this.state.type !== null) ? this.props.intl.locale === 'sv' ? ' Kr' : " SEK" : null}
              </b>
              </h6>
                {(!isSelection || this.state.type !== null)?
                  <div 
                    style={{fontSize: '0.75rem', marginBottom: '-8px', color: '#F00'}}
                  >
                      1000+ kvar
                  </div> :
                  null
                }
            </div>
            {/*<h6 style={{margin: '0px'}}>
              <b>
                {isSelection ? 
                    this.state.type !== null ? article.products[this.state.type].actual_cost : '-'
                    : article.cost
                }
                {(!isSelection || this.state.type !== null) ? this.props.intl.locale === 'sv' ? ' Kr' : " SEK" : null}
              </b>
            </h6>
            */}
            <CardActionButtons style={{position: 'absolute', right: '0px', marginRight: '16px'}}>
              <Button disabled={isSelection && this.state.type === null}>
                <Icon icon="add_shopping_cart" style={{marginRight: '8px'}}/>
                <FormattedMessage id='Shop.addToCart' />
              </Button>
            </CardActionButtons>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default injectIntl(ArticleCard);
