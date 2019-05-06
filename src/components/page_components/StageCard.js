import React, { Component, forwardRef } from 'react';

import Header from '../../components/page_components/NiceHeader';

import { orchestras } from '../..//orchestraConstants';

import { FormattedMessage, injectIntl } from 'react-intl'
import {
  Card,
  CardMedia,
  CardActions,
  CardPrimaryAction,
  CardActionButtons,
  CardActionButton,
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

function getHM(time){
  return time.substring(10, 16);
}

class StageCard extends Component{

  render(){
    console.log(this.props.current)
    return(
      <React.Fragment>
        <Card className='about-card' >
          <CardPrimaryAction
            style={{cursor: 'pointer'}}
          >
            <CardMedia
              sixteenByNine
              style={{ backgroundImage: 'url('+ this.props.img + ')' }}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <h5 style={{margin: '8px 0px'}}>
                {this.props.stageName}
              </h5>
              <div className='fading-desc' style={{height: '600px'}}>
                  {
                    this.props.intl.formatMessage({id: 'ScheduleFestival.now'}) + " - " 
                    + getHM(this.props.current.end)
                    + ": " 
                  }
                <b>{orchestras[this.props.current.id]} </b>
                <br/>
                  {
                    getHM(this.props.next.start)
                      + " - "
                      + getHM(this.props.next.end)
                      + ": "
                  }
                <b> {orchestras[this.props.next.id]} </b>
              </div>
              <div className='fading-bot' style={{bottom: '16'}}/>
            </div>
          </CardPrimaryAction>
        </Card>
      </React.Fragment>
    );
  }
}

export default injectIntl(StageCard);
