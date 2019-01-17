import React, { Component, forwardRef } from 'react';

import HighlightedArea from '../components/HighlightedArea';
import SofCountdown from '../components/SofCountdown'

import { Grid, GridCell, GridInner } from '@rmwc/grid';

class CortegeAbout extends Component{
  render() {
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

        <HighlightedArea className='countdown-inner' color='green'>
          <SofCountdown 
            label="TID KVAR TILL TEMASLÄPP" 
            toDate={new Date('2019-01-21T00:00:00')} 
            countdownFinishCallback={()=> console.log('timer finished')}
          />
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
                Känner du att du och din grupp vill vara med i detta spektakel så finns all viktig information att läsa här nedanför.
              </p>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default CortegeAbout;
