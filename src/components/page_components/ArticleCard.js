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
import { Button } from '@rmwc/button';
import { Icon } from '@rmwc/icon';
import { Select } from '@rmwc/select';

import { FormattedMessage, injectIntl } from 'react-intl'

import { connect } from 'react-redux';

class ArticleCard extends Component{
  render(){
    const article = this.props.article;
    return(
      <React.Fragment>
        <Card style={{ width: '100%', position: 'relative' }} >
          <CardMedia
            sixteenByNine
            style={{
              backgroundImage:
              'url(' + article.imageURL + ')'
            }}
          />
          <div style={{ padding: '1rem' }}>
            <h4 style={{ margin: '0px'}}>
              {article.name}
            </h4>
            <p style={{marginBottom: '0px'}}>
              {article.description}
            </p>
          </div>
          <ListDivider/>
            { article.products.length > 1 ?
                <Select 
                  label={this.props.intl.formatMessage({id: 'Shop.type'})}
                  options={article.products.map(prod => {return {label: prod.kind, value: prod.id, key: prod.id}})} 
                  style={{margin: '8px'}}
                /> 
                : null
            }
          <div style={{height: '64px'}}/>
          <CardActions style={{position: 'absolute', bottom: '0px', width: '100%', padding: '16px'}}>
            <h6 style={{margin: '0px'}}>
              <b className={this.props.intl.locale === 'sv' ? 'addKr' : 'addSek'} >
                {article.cost}
              </b>
            </h6>
            <CardActionButtons style={{position: 'absolute', right: '0px', marginRight: '16px'}}>
              <Button>
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

