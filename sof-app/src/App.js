import React, { Component } from 'react';
import Menu from './components/Menu'
import Content from './components/Content'
import ErrorBoundary from './components/ErrorBoundary'



import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';

// renders an h1
const Example1 = props => (
  <Typography tag="h1" use="headline4">
    Hello World
  </Typography>
);

// renders an anchor
const Example2 = props => (
  <Button tag="a" href="https://google.com">
    Hello World
  </Button>
);


class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <Menu />
          <Content />
          <Example1 />

          <Example2 /> 
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
