import React, { Component } from 'react';
import './MenuBar.scss';

import TopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

export default class MenuBar extends Component{
  render(){
    return(
      <div>
        <TopAppBar
          title='Miami, FL'
          navigationIcon={<MaterialIcon
            icon='menu'
            onClick={() => console.log('click')}
          prominent
          />}
          actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
        />
      </div>
    )
  }
}


