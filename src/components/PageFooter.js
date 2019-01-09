import React, { Component, forwardRef } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { ListDivider } from '@rmwc/list';

import { Ripple } from '@rmwc/ripple';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

import posed from 'react-pose';

const PosedFooter= posed.div({
  enter: {opacity: 1},
  exit: {opacity: 0 }
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

                <GridCell span='4'>
                  <h3>
                    Studentorkesterfestivalen
                  </h3>
                  <h5>
                    I samarbete med LinTek
                  </h5>
                </GridCell>

                <GridCell phone='4' tablet='4' desktop='8' className='page-footer-ra-text'>
                  <h3>
                    Information
                  </h3>
                  <h5>
                    Om SOF som bör finnas i footern
                  </h5>
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
