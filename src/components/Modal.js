import React, { Component } from 'react';

import posed from 'react-pose';

import ScrollLock, { TouchScrollable } from 'react-scrolllock';

import { IconButton } from '@rmwc/icon-button';

const Frame = posed.div({
  closed: {
    applyAtEnd: { display: 'none' },
    opacity: 0
  },
  open: {
    applyAtStart: { display: 'block' },
    opacity: 1
  }
});

const Container = posed.div({
  closed: {
    applyAtEnd: { display: 'none' },
    opacity: 0,
    scale: 0.8,
    transition:{
      duration: 150,
    }
  },
  open: {
    applyAtStart: { display: 'flex' },
    opacity: 1,
    scale: 1,
  }
});

export default class Modal extends Component{
  constructor(props){
    super(props)
  }

  render(){
    let stopScroll;

    return(
      <div>
        <ScrollLock
          isActive={this.props.isOpen}
        />
        <TouchScrollable>
          <div>
            <Frame
              className = 'modal-frame' pose={(this.props.isOpen) ? 'open' : 'closed'}
            />
            <Container className = 'modal-container' pose={(this.props.isOpen) ? 'open' : 'closed'}>
              <IconButton
                icon='close'
                className='modal-exit-button'
                onClick={() => this.props.exitCallback()}
              />
              {this.props.children}
            </Container>
          </div>
        </TouchScrollable>
      </div>
    );
  }
}

