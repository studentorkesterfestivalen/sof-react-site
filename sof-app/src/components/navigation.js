import React, { Component, forwardRef } from 'react';

import posed from 'react-pose';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from '@rmwc/top-app-bar';


const bing = forwardRef((props, ref) =>
  <TopAppBarRow  elementRef={ref} {...props}/>
);

const PosedTopAppBarRow = posed(bing)({
  hoverable: true,
  init: { opacity: 1, staggerChildren:50},
  hover: { opacity: 1, staggerChildren:50},
  hoverEnd: { opacity: 1, staggerChildren:50, staggerDirection: -1},
})

const bong = forwardRef((props, ref) =>
  <TopAppBarActionItem  elementRef={ref} {...props}/>
);

const PosedTopAppBarActionItem = posed(bong)({
  init: { opacity: 0, x: -20},
  hover: { opacity: 1, x: 0},
  hoverEnd: { opacity: 0, x: -20,
    transition: {
      opacity: {
        duration: 120,
        ease: 'linear'
      }
    }
  },
})


// Add this to mobile later
// navigationIcon={<MaterialIcon
// icon='menu'
// onClick={() => console.log('click')}
// />}

export default class Navbar extends Component{
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e) {
    console.log(this.myRef)
  }

  render(){
    return(
      <div>
        {/*
        <PosedTopAppBar
          className="top-bar"
          title='SOF19'
          fixed
          actionItems={[<Button>Om SOF</Button>,
            <Button className="last-link" onClick={this.handleClick}>Historia</Button>,
            <MaterialIcon key='cart' icon='shopping_cart' />,
            <MaterialIcon key='account' icon='account_circle' />]}
        />
        */}
        <TopAppBar fixed >
          <PosedTopAppBarRow >
            <TopAppBarSection alignStart onClick={this.handleClick} elementRef={e => (this.myRef = e)}>
              <TopAppBarTitle>Title</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd>
              <PosedTopAppBarActionItem aria-label="Download" alt="Download">
                file_download
              </PosedTopAppBarActionItem>
              <PosedTopAppBarActionItem
                aria-label="Print this page"
                alt="Print this page"
              >
                print
              </PosedTopAppBarActionItem>
              <PosedTopAppBarActionItem
                aria-label="Bookmark this page"
                alt="Bookmark this page"
              >
                bookmark
              </PosedTopAppBarActionItem>
            </TopAppBarSection>
          </PosedTopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust/>
      </div>
    )
  }
}
