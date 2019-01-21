import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { ListDivider } from '@rmwc/list';

import { Ripple } from '@rmwc/ripple';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

import posed from 'react-pose';

const PosedFooter= posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -50, opacity: 0}
});

class PageFooter extends Component{

  render() {
    return(
      <React.Fragment>

        {/*For when content doesn't fill screen, footer still att bottom*/}
        <div className='page-footer-margin'/> 

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
                    <b>Arrangeras av&nbsp;</b>
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      href="https://lintek.liu.se/" 
                    >
                      <img 
                        style={{height: '20px',paddingTop: "4px"}}
                        async='on'
                        src='https://lintek.liu.se/wp-content/uploads/2018/04/logo-mobile3x.png'
                        alt='LinTek'
                      />
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
        </PosedFooter>
      </React.Fragment>
    );
  }
}

export default PageFooter;
