import React, { Component } from 'react';
<<<<<<< HEAD
import { Grid, GridInner } from '@rmwc/grid';
=======

import FormTextInput from './FormTextInput';

//import { TextField, TextFieldIcon, TextFieldHelperText } from '@rmwc/textfield';
import { Grid, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
>>>>>>> 9ab0b5acbc6d3df8bd9cd95434c87d63bf8978fc
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenuSurface } from '@rmwc/menu';
import Login  from './Login';

export default class AccountPopup extends Component {
  constructor(props){
    super(props)

    this.state = {open: false, loggedIn: false}
  }

  render(){
    var content = <Login/>;
    if(this.state.loggedIn){
      content = <Account/>;
    }

    return(
      <SimpleMenuSurface
        className='login-popup-surface'
        handle={<TopAppBarActionItem> account_circle </TopAppBarActionItem>}
      >
        {content}
      </SimpleMenuSurface>
    );
  }
}





class Account extends Component{

  render(){
    return(
      <React.Fragment>
        <Grid>
          <GridInner>

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}
