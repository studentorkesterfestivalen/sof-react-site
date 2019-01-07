import React, { Component, forwardRef } from 'react';

class PageHeader extends Component{

  render() {
    return(
      <div className={this.props.className}>
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
      </div>
    );
  }
}

export default PageHeader;
