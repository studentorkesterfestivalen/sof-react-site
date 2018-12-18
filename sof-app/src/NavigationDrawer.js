import React, { Component } from 'react';
import './NavigationDrawer.scss';

import MaterialIcon from '@material/react-material-icon';

import Drawer from '@material/react-drawer';
import List, {ListItem, ListItemText, ListItemGraphic} from '@material/react-list';


export default class NavigationDrawer extends Component{
  constructor(props){
    super(props);

  }
  state = {selectedIndex: 0};

  render(){
    return(
      <div className={this.props.className}>
        <Drawer>
          <List singleSelection selectedIndex={this.state.selectedIndex}>
            <ListItem>
              <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
              <ListItemText primaryText='Om SOF' />
            </ListItem>
            <ListItem>
              <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
              <ListItemText primaryText='Historia' />
            </ListItem>
          </List>
        </Drawer>
      </div>

    );
  }
}

