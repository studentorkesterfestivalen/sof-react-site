import React, { Component } from 'react';
import Menu from './components/Menu'
import Content from './components/Content'
import ErrorBoundary from './components/ErrorBoundary'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';

class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <Menu />
          <Content />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
