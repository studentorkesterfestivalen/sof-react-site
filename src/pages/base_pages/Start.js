
import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import ContactCard from '../../components/page_components/ContactCard';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { ListDivider } from '@rmwc/list';

import { SimpleDataTable } from '@rmwc/data-table';


class Start extends Component{
    constructor(props){
      super(props)

      this.onTimerFinish = this.onTimerFinish.bind(this);

      this.state = {timerFinished: false, toDate: new Date('2019-01-21T00:00:00')};
    }

    static pageTitle(){
    return <FormattedMessage id='Start.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Start.navTitle' />
  }

  onTimerFinish(){
    this.setState({timerFinished: true});
  }

  render() {

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
          </GridInner>
        </Grid>

        <HighlightedArea className='countdown-inner' color='green'
        >
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center'>
            <h3 style={{margin: '10px'}}>
              <FormattedMessage id='CortegeAbout.themeText' />
            </h3>
          </GridCell>
          <GridCell phone='4' tablet='8' desktop='12' >
            <ListDivider/>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center'>
            <h2 style={{margin: '10px'}}>
              <b> <FormattedMessage id='CortegeAbout.theme' /> </b>
            </h2>
          </GridCell>
            {/*(!this.state.timerFinished) ?
              <GridCell span='12'>
                <Button
                  raised
                  style={{width: '100%'}}
                  onClick={() => this.setState({toDate: new Date(Date.now() + 2000)})} 
                > 
                  Press to test timer 
                </Button>
              </GridCell>
              : ''
              */}
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(Start);
