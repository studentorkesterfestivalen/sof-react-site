import React, { Component, forwardRef } from 'react';

import Header from '../../components/page_components/NiceHeader';

import { orchestras } from '../..//orchestraConstants';

import { TouchScrollable } from 'react-scrolllock';

import { FormattedMessage, injectIntl } from 'react-intl'
import {
  Card,
  CardMedia,
  CardActions,
  CardPrimaryAction,
  CardActionButtons,
  CardActionButton,
} from '@rmwc/card';
import { CircularProgress } from '@rmwc/circular-progress';

import { Ripple } from '@rmwc/ripple';

import {
  List,
  ListDivider,
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

    console.log(this.props)
    if (this.props.current === null){
      return(
        <Card className='about-card' 
          style={{minHeight: '128px'}}
        >
          <div className='h-center'>
            <CircularProgress size="large" />
          </div>
        </Card>
      );
    }
    const curStage = this.props.current;
    const stageList = this.props.stageList;

    const pastGigs = stageList.slice(0, curStage);
    var nextGigs = stageList.slice(curStage);

    const moreText = this.props.soon ? <FormattedMessage id='ScheduleFestival.soon' />  : <FormattedMessage id='ScheduleFestival.full' />

    if (this.props.break){
      const currentGig = {
        end: nextGigs[0].start,
        id: 39
      }
      //nextGigs = nextGigs.slice(1);
      nextGigs.unshift(currentGig);
    }

    const pastGigsElems = pastGigs.reverse().map(gig => (
      <React.Fragment key={gig.id + gig.start}>
        <ListItem style={{height: '72px'}} className='mdc-item-uninteractive' ripple={false}>
          <span>
            {
              getHM(gig.start)
                + " - "
                + getHM(gig.end)
                + ": "
            }
          <b> {orchestras[gig.id]} </b>
          </span>
        </ListItem>
        <ListDivider/>
      </React.Fragment>
    ));

    const nextGigElems = nextGigs.map((gig, it) => (
      <React.Fragment>
        <ListItem style={{height: '72px'}} className='mdc-item-uninteractive' ripple={false}>
          <span>
            {
              ( it === 0 ?
                this.props.intl.formatMessage({id: 'ScheduleFestival.now'}) :
                getHM(gig.start)
              )
                + " - "
                + getHM(gig.end)
                + ": "
            }
          <b> {orchestras[gig.id]} </b>
          </span>
        </ListItem>
        {it < nextGigs.length - 1? <ListDivider/> : null}
      </React.Fragment>
    ));

    return(
      <React.Fragment>
          <TouchScrollable>
        <Card 
          className='about-card' 
          style={{height: '80vh', width: '90vw', maxWidth: '720px', overflowY: 'scroll', pointerEvents: 'auto'}}
        >
            <div>
              <List>
                {nextGigElems}
              </List>
              <Header>
                <FormattedMessage id='ScheduleFestival.pastGigs' />
              </Header>
              <List>
                {pastGigsElems}
              </List>
            </div>
        </Card>
          </TouchScrollable>
      </React.Fragment>
    );
  }
}

export default injectIntl(StageCard);
