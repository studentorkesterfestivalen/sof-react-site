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
        <div id="fb-root"></div>
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
          <SofCountdown 
            label={<FormattedMessage id='About.timeLeft' />}
            toDate={new Date('2019-05-09T08:00:00')} />
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
              <h2 style={{marginBottom: 0}}>
                SOF17 - Aftermovie
              </h2>
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
              <div style={{position: 'relative', width: '100%', paddingBottom: '56.25%', height: '0', overflow: 'hidden'}}>
                <iframe 
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FStudentorkesterfestivalen%2Fvideos%2F1599229666767241%2F&width=auto&show_text=false&appId" 
                  style={{position: 'absolute', top: 0, left: 0, border: 'none',  width: '100%', height:'100%'}} 
                  scrolling="no" frameborder="0" 
                  allowTransparency="true" allow="encrypted-media" allowFullScreen="true"></iframe>
              </div>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(Om, { withRef: true });
