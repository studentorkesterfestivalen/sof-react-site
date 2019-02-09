import React, { Component } from 'react';

import AdministrativePageHeader from './AdministrativePageHeader';
import PageFooter from './PageFooter';

import posed from 'react-pose';

const PosedPage = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

export default class AdministrativePage extends Component{

  render() {
    return(
      <div className='administrative-page'>
        <AdministrativePageHeader
          title={this.props.content.pageTitle()}
        />

        <PosedPage  className='base-page-content'>
          {this.props.children}
        </PosedPage>

        <PageFooter/>
      </div>
    );
  }
}

