import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { ListDivider } from '@rmwc/list';

import { Ripple } from '@rmwc/ripple';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

import posed from 'react-pose';

import { FormattedMessage } from 'react-intl';

const PosedFooter= posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

class PageFooter extends Component{

  render() {
    return(
      <React.Fragment>

        {/*For when content doesn't fill screen, footer still att bottom
        <div className='page-footer-margin'/> */}

        <PosedFooter className='page-footer'>
          <div className='page-footer-content'>
            <Grid>
              <GridInner>
                <GridCell phone='4' tablet='8' desktop='12' >
                  <ListDivider/>
                </GridCell>

                <GridCell phone='4' tablet='5' desktop='8'>
                  <h6>
                      <b>&copy;Studentorkesterfestivalen, 2019</b>
                  </h6>
                </GridCell>
                <GridCell phone='4' tablet='3' desktop='4' className='page-footer-ra-text v-center'>
                  <div className='v-center' style={{flexWrap: 'wrap'}}>
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      href="https://lintek.liu.se/" 
                      style={{color: 'white'}}
                    >
                      <h6>
                        <FormattedMessage id="Footer.LinTek"/>
                      </h6>
                              {/*<img 
                        style={{height: '20px'}}
                        async='on'
                        src='https://lintek.liu.se/wp-content/uploads/2018/04/logo-mobile3x.png'
                        alt='LinTek'
                      />
                        */}
                    </a>
                  </div>
                </GridCell>

                <GridCell span='1' desktop='2'>
                  <Ripple unbounded >
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      href="https://www.facebook.com/Studentorkesterfestivalen/" 
                      className='fa-ripple'
                    >
                      <FontAwesomeIcon icon={faFacebookSquare} size='3x'/>
                    </a>
                  </Ripple>
                </GridCell>
                <GridCell span='1' desktop='2'>
                  <Ripple unbounded >
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      href="https://www.instagram.com/studentorkesterfestivalen/" 
                      className='fa-ripple'
                    >
                      <FontAwesomeIcon icon={faInstagram} size='3x'/>
                    </a>
                  </Ripple>
                </GridCell>
              </GridInner>
            </Grid>
          </div>
          <Grid style={{width: '100%', paddingTop: '0px'}}>
            <GridInner>
              <GridCell phone='4' tablet='8' desktop='12' >
                <div
                  style={{display: 'flex', alignItems: 'center'}}
                >
                  <ListDivider style={{width: '100%'}}/>
                  <h6 style={{flexGrow: '2', flexShrink: '0', margin: '0px 12px'}}>
                    <b> <FormattedMessage id='Footer.sponsors'/> </b>
                  </h6>
                  <ListDivider style={{width: '100%'}}/>
                </div>
              </GridCell>
              <GridCell phone='4' tablet='4' desktop='4' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="http://ebbepark.se/" 
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/ebbepark_logo.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='4' tablet='4' desktop='4' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.studieframjandet.se/" 
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/Studieframjandet_logo.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='4' tablet='4' desktop='4' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.grolls.se/" 
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/Grolls_logo.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
            </GridInner>
          </Grid>
        </PosedFooter>
      </React.Fragment>
    );
  }
}

export default PageFooter;
