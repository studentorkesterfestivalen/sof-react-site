import React, { Component, forwardRef } from 'react';

import HighlightedArea from '../components/HighlightedArea';
import SofCountdown from '../components/SofCountdown'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { Link } from 'react-router-dom';

class CortegeAbout extends Component{
  constructor(props){
    super(props)

    this.onTimerFinish = this.onTimerFinish.bind(this);

    this.state = {timerFinished: false, toDate: new Date('2019-01-21T00:00:00')};
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

    if(this.state.timerFinished){
        timerRender = <GridCell phone="4" tablet="8" desktop='12' className = 'h-center'>
          <h1>
            Temat är BING BONG
          </h1>
        </GridCell>;
    }

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
          {(!this.state.timerFinished) ?
              <GridCell span='12'>
                <Button 
                  raised 
                  style={{width: '100%'}}
                  onClick={() => this.setState({toDate: new Date(Date.now() + 5000)})} 
                > 
                  Press to test timer 
                </Button>
              </GridCell>
              : ''}
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2>
                Viktiga Datum
              </h2>
              <p>
                Nedan följer några viktiga datum under både Kårtegeansökan och inför själva Kårtegen:<br/><br/>
                20/1 - Temasläpp för Kårtegen 2019<br/>
                4/2 - Ansökan öppnar!<br/>
                5/2 - Kårtegepub i Gasquen.<br/>
                17/2 - Ansökan stänger!<br/>
                2/5 - Byggstartsfest.<br/>
                9/5 - SOF19 börjar.<br/>
                10/5 - Sista byggdag.<br/>
                11/5 - Kårtegen 2019 går av stapeln!
              </p>

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
