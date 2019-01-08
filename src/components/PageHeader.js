import React, { Component, forwardRef } from 'react';

import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';

import posed from 'react-pose';

const PosedHeaderTitle = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -50, opacity: 0}
});

const PosedHeaderImage= posed.div({
  enter: {opacity: 1},
  exit: {opacity: 0 }
});

class PageHeader extends Component{

  render() {
    var imageClass = '';
    if(this.props.color === 'Red'){
      imageClass = 'page-header-image page-header-red';
    } else if (this.props.color === 'Yellow'){
      imageClass = 'page-header-image page-header-yellow';
    } else{
      imageClass = 'page-header-image';
    }
    return(
      <React.Fragment>
        <div className='page-header'>
          <TopAppBarFixedAdjust/>
          <PosedHeaderImage className={imageClass}/>
          <PosedHeaderTitle className='page-header-content'>
            <div className='page-header-title'>
              <h1>
                {this.props.title}
              </h1>
            </div>
          </PosedHeaderTitle>
        </div>
      </React.Fragment>
    );
  }
}

export default PageHeader;
