import React, { Component } from 'react';
import './MenuBar.scss';

import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer';
import '@material/react-drawer/index.scss';

import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

import NavigationBar from './NavigationBar'
import NavigationDrawer from './NavigationDrawer'
import Button from '@material/react-button';

// Add this to mobile later
// navigationIcon={<MaterialIcon
// icon='menu'
// onClick={() => console.log('click')}
// />}

export default class MenuBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <CustomTopAppBar
          ref={this.child}
          className="top-bar"
          title='SOF19'
          navigationIcon={<MaterialIcon
          icon='menu'
          onClick={() => console.log('click')}
          />}
          fixed
          actionItems={[<Button>Om SOF</Button>,
            <Button className="last-link">Historia</Button>,
            <MaterialIcon key='cart' icon='shopping_cart' />,
            <MaterialIcon key='account' icon='account_circle' />]}
        />
      </div>
    )
  }
}

class CustomTopAppBar extends TopAppBar{
  constructor(props){
    super(props);

  }

}


