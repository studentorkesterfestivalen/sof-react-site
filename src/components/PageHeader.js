import React, { Component, forwardRef } from 'react';

class PageHeader extends Component{

  render() {
    return(
      <React.Fragment>
        <div className='page-header'>
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
