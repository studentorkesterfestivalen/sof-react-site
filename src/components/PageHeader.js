import React, { Component, forwardRef } from 'react';

import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';

class PageHeader extends Component{

  render() {
    return(
      <React.Fragment>
        <div className='page-header'>
          <TopAppBarFixedAdjust/>
          <div className="page-header-image"/>
          <div className='page-header-content'>
            <div className='page-header-title'>
              <h1>
                {this.props.title}
              </h1>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PageHeader;
