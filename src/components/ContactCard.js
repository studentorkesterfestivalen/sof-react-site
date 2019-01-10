import React, { Component } from 'react';

import {
  Card,
  CardMedia,
} from '@rmwc/card';

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
} from '@rmwc/list';

class ContactCard extends Component{

  render(){
    return(
      <React.Fragment>
        <Card className='contact-card'>
          <CardMedia
            sixteenByNine
            style={{
              backgroundImage:
              'url(https://material-components-web.appspot.com/images/16-9.jpg)'
            }}
          />
          <List twoLine nonInteractive avatarList >
            <ListItem ripple={false}>
              <ListItemGraphic className='avatar-graphic' style={{backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)'}} />
              <ListItemText>
                <ListItemPrimaryText>{this.props.name}</ListItemPrimaryText>
                <ListItemSecondaryText>{this.props.title}</ListItemSecondaryText>
              </ListItemText>
            </ListItem>
            <ListItem ripple={false} className='select-all' >
              <ListItemGraphic icon="mail" />
              {this.props.email}
            </ListItem>
          </List>
        </Card>
      </React.Fragment>
    );
  }
}

export default ContactCard;
