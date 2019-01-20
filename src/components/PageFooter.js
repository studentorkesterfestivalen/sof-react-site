import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { ListDivider } from '@rmwc/list';

import { Ripple } from '@rmwc/ripple';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { IconButton } from '@rmwc/icon-button';

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

                <GridCell phone='4' tablet='6' desktop='8'>
                  <h5>
                    &copy;Studentorkesterfestivalen, 2019
                  </h5>
                  I samarbete med LinTek
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
