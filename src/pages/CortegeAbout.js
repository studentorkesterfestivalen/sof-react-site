import React, { Component, forwardRef } from 'react';

import HighlightedArea from '../components/HighlightedArea';
import SofCountdown from '../components/SofCountdown'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { Link } from 'react-router-dom';

import { SimpleDataTable } from '@rmwc/data-table';

class CortegeAbout extends Component{
  constructor(props){
    super(props)

    this.onTimerFinish = this.onTimerFinish.bind(this);

    this.state = {timerFinished: false, toDate: new Date('2019-01-21T00:00:00')};
  }

  static pageTitle(){
    return 'KÅRTEGE - INFO';
  }

  static pageNavTitle(){
    return 'Kårtege - Info';
  }

  onTimerFinish(){
    console.log('hi');
    this.setState({timerFinished: true});
  }

  render() {
    var timerRender = (<SofCountdown 
            label="TID KVAR TILL TEMASLÄPP" 
            toDate={this.state.toDate} 
            countdownFinishCallback={this.onTimerFinish}
          />
    );

    /*if(this.state.timerFinished){
        timerRender = <GridCell phone="4" tablet="8" desktop='12' className = 'h-center'>
          <h2>
            Temat är BING BONG
          </h2>
        </GridCell>;
    }*/

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
                Om mindre än fyra (4!!!) månader är det återigen dags för den maffiga Kårtegen att rulla genom Linköpings stadskärna mitt under SOF. Kårtegen är ett arrangemang som hålls varje SOF där studentorkestrar, baletter och studentgrupper medverkar inför en publik som består av både studenter och icke-studenter. Orkestrarna står för musiken och övriga studenter för underhållningen medan tåget rullar genom staden.
              </p>

              <p>
                Kårtegen har olika tema varje år som studenterna bygger sina konstruktioner efter, klär ut sig till och spexar efter.
              </p>
            </GridCell>
          </GridInner>
        </Grid>

        <HighlightedArea className='countdown-inner' color='green'
        >
          {timerRender}
          {/*(!this.state.timerFinished) ?
              <GridCell span='12'>
                <Button 
                  raised 
                  style={{width: '100%'}}
                  onClick={() => this.setState({toDate: new Date(Date.now() + 5000)})} 
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
                Viktiga Datum
              </h2>
              <p>
                Nedan följer några viktiga datum under både Kårtegeansökan och inför själva Kårtegen:
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
                      ['10/5','Sista byggdag.'],
                      ['11/5','Kårtegen 2019 går av stapeln!'],
                    ]
                  }
                />
              </div>

              <p>
                Känner du att du och din grupp vill vara med i detta spektakel så finns all viktig information att läsa om du klickar nedanför!
              </p>
              <Button
                raised
                style={{width: '100%'}}
                tag={Link}
                to='/cortege-registration'
              >
                Kårtegeansökan
              </Button>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default CortegeAbout;
