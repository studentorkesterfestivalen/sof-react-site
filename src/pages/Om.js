import React, { Component, forwardRef } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import HighlightedArea from '../components/HighlightedArea';
import SofCountdown from '../components/SofCountdown'
import { Grid, GridCell, GridInner } from '@rmwc/grid';

class Om extends Component{

  constructor(props) {
    super(props);
    this.intl = this.props.intl;
  };

  static pageTitle(){
    return <FormattedMessage id='About.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='About.navTitle' />
  }

  render() {
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
                <FormattedMessage
                  id="About.aboutText"
                  defaultMessage="9-11 maj 2019 är det återigen dags för Studentorkesterfestivalen! SOF är ett tredagarsevenemang som arrangeras av LinTek och hålls varannat år i Linköping för både studenter och icke-studenter. Dessa tre fullspäckade SOF-dagar är fyllda av underhållning i form av en kårtege, ett festivalområde och orkesterspelningar."
                />
              </p>
            </GridCell>
          </GridInner>
        </Grid>

        <HighlightedArea className='countdown-inner' color='green'>
          <SofCountdown label={this.intl.formatMessage({id: 'About.timeLeft'})} toDate={new Date('2019-05-09T08:00:00')} />
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2>
               <FormattedMessage
                  id="About.festival"
                  defaultMessage="Festival"
                  />
              </h2>
              <p>
                <FormattedMessage
                  id="About.festivalInfo"
                  defaultMessage="Festivalen besöks under SOF av tiotusentals studenter och består av ett område fyllt av skojiga aktiviteter, feta orkesterspelningar, servering av mat och dryck samt tre hejdundrande fester!"
                />
              </p>
              <h2>
                <FormattedMessage
                  id="About.kartege"
                  defaultMessage="Kårtege"
                  />
              </h2>
              <p>
                
                <FormattedMessage 
                  id="About.kartegeInfo"
                  defaultMessage="Kårtegen som rullar genom Linköping den 11 maj har upp emot 50 000 åskådare och består av ekipage byggda av Linköpings påhittiga studenter."
                />
              </p>
              <h2>
               <FormattedMessage
                  id="About.orchestra"
                  defaultMessage="Orkester"
                  />
              </h2>
              <p>
                <FormattedMessage
                  id="About.orchestraInfo"
                  defaultMessage="SOF får besök av hundratals orkestermedlemmar från hela vårt avlånga land, resterande länder i norden och delar av norra Europa. Orkestrarna spelar under hela SOF-helgen både på festivalområdet och nere på stan!"
                />
              </p>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(Om, { withRef: true });
