import React, { Component } from 'react';

import HighlightedArea from '../components/HighlightedArea';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { Link } from 'react-router-dom';

import { ListDivider } from '@rmwc/list';

import { SimpleDataTable } from '@rmwc/data-table';

class CortegeAbout extends Component{
    constructor(props){
      super(props)

      this.onTimerFinish = this.onTimerFinish.bind(this);

      this.state = {timerFinished: false, toDate: new Date('2019-01-21T00:00:00')};
    }

    static pageTitle(){
    return <FormattedMessage id='CortegeAbout.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='CortegeAbout.navTitle' />
  }

  onTimerFinish(){
    this.setState({timerFinished: true});
  }

  render() {

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
                <FormattedMessage id='CortegeAbout.Info1' />
              </p>
              <p>
                <FormattedMessage id='CortegeAbout.Info2' />
              </p>
            </GridCell>
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
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2>
                <FormattedMessage id='CortegeAbout.dates' />
              </h2>
              <p>
                <FormattedMessage id='CortegeAbout.dates2' />:
              </p>

              <div className='h-center'>
                <SimpleDataTable
                  className='rmwc-table-full-width'
                  getRowProps={row => {
                    return {className: 'rmwc-table-uninteractive'}
                  }}
                  getCellProps={(cell, index, isHead) => {
                    return {className: 'rmwc-table-uninteractive', style: {whiteSpace: 'normal'}}
                  }}
                  headers={[['Datum', 'Händelse']]}
                  data={
                    [
                      ['20/1','Temasläpp för Kårtegen 2019'],
                      ['4/2','Ansökan öppnar!'],
                      ['5/2','Kårtegepub i Gasquen.'],
                      ['17/2','Ansökan stänger!'],
                      ['2/5','Byggstartsfest.'],
                      ['9/5','SOF19 börjar.'],
                      ['11/5','Kårtegen 2019 går av stapeln!'],
                    ]
                  }
                />
              </div>

              <p>
                <FormattedMessage id='CortegeAbout.applyHere' />

              </p>
              <Button
                raised
                style={{width: '100%'}}
                tag={Link}
                to='/cortege-application'
              >
                <FormattedMessage id='CortegeAbout.application' />
              </Button>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(CortegeAbout);
