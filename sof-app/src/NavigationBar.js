import React, { Component } from 'react';
import './NavigationBar.scss';

import MaterialIcon from '@material/react-material-icon';

import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';


export default class NavigationBar extends Component{
  constructor(props){
    super(props);

  }
  state = {activeIndex: 0};

  render(){
    return(
      <div className={this.props.className}>
        <TabBar
          fixed
          activeIndex={this.state.activeIndex}
          handleActiveIndexUpdate={(activeIndex) => this.setState({activeIndex})}
        >
          <Tab>
            <span className='mdc-tab__text-label'>One</span>
          </Tab>
          <Tab>
            <span className='mdc-tab__text-label'>Two</span>
          </Tab>
          <Tab>
            <span className='mdc-tab__text-label'>Three</span>
          </Tab>
        </TabBar>
      </div>

    );
  }
}

