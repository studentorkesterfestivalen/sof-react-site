import React, { Component, forwardRef } from 'react';

import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'
import SofCountdown from '../components/SofCountdown'

import { Grid, GridCell, GridInner } from '@rmwc/grid';

class ExamplePage extends Component{


  render() {
    return(
      <div className='page'>
        <PageHeader title="OM SOF"/>

        <div className='page-content'>
          <Grid className="base-outer-grid base-outer-grid--first">
            <GridInner>
              <GridCell phone="4" tablet="8" desktop='12'>
                <p>
                  9-11 maj 2019 är det återigen dags för Studentorkesterfestivalen! SOF är ett tredagarsevenemang som arrangeras av LinTek och hålls varannat år i Linköping för både studenter och icke-studenter. Dessa tre fullspäckade SOF-dagar är fyllda av underhållning i form av en kårtege, ett festivalområde och orkesterspelningar.
                </p>
              </GridCell>
            </GridInner>
          </Grid>

          <SofCountdown label="TID KVAR TILL SOF" toDate={new Date('2019-05-09T08:00:00')} />

          <Grid className="base-outer-grid ">
            <GridInner>
              <GridCell phone="4" tablet="8" desktop='12'>
                <h2>
                  Festival
                </h2>
                <p>
                  Festivalen besöks under SOF av tiotusentals studenter och består av ett område fyllt av skojiga aktiviteter, feta orkesterspelningar, servering av mat och dryck samt tre hejdundrande fester!
                </p>
                <h2>
                  Kårtegen
                </h2>
                <p>
                  Kårtegen som rullar genom Linköping den 11 maj har upp emot 50 000 åskådare och består av ekipage byggda av Linköpings påhittiga studenter.
                </p>
                <h2>
                  Orkester
                </h2>
                <p>
                  SOF får besök av hundratals orkestermedlemmar från hela vårt avlånga land, resterande länder i norden och delar av norra Europa. Orkestrarna spelar under hela SOF-helgen både på festivalområdet och nere på stan!
                </p>
              </GridCell>
            </GridInner>
          </Grid>

        </div>

        <PageFooter/>
      </div>
    );
  }
}

export default ExamplePage;
