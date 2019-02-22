import React, { Component } from 'react';

import {
  Card,
  CardPrimaryAction,
  CardActionButton,
  CardActionIcon,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '@rmwc/card';

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
} from '@rmwc/list';
import { Typography } from '@rmwc/typography';

import { injectIntl } from 'react-intl';

class OrchestraCard extends Component{

  render(){
    const { orchestra } = this.props;
    const types = [
      this.props.intl.formatMessage({id: 'Orchestra.orchestra'}),
      this.props.intl.formatMessage({id: 'Orchestra.band'}),
    ]

    return(
      <React.Fragment>
        <Card style={{ width: '100%' }} >
          <div style={{ padding: '1rem' }}>
            <Typography use="headline5" tag="div">
              {orchestra.orchestra.name}
            </Typography>
            <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
              {types[orchestra.orchestra.orchestra_type]}
            </Typography>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default injectIntl(OrchestraCard);
