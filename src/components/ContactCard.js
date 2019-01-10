import React, { Component, forwardRef } from 'react';

import {
  Card,
  CardMedia,
} from '@rmwc/card';

import { Ripple } from '@rmwc/ripple';

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
} from '@rmwc/list';

import posed, {PoseGroup} from 'react-pose';

const FCard = forwardRef((props, ref) => 
  <Card elementRef={ref} {...props}>
    {props.children}
  </Card>
);

const PosedTransformableCard = posed(FCard)({
  desktop: {
    applyAtStart: {flexDirection: 'column'},

  },
  intermediateMobile: {
  
  },
  intermediateDesktop: {
  
  },
  mobile: {
    applyAtStart: {flexDirection: 'row'},
  },
});

const FCardMedia = forwardRef((props, ref) =>
  <CardMedia elementRef={ref} {...props}/>
);

const PosedTransformableCardMedia = posed(FCardMedia)({
  desktop: {
    paddingTop: '56.25%',
    applyAtStart: {width: '100%'}
  },
  intermediateDesktop: {
    paddingTop: '0%',
    applyAtEnd: {width: '0px'}
  },
  intermediateMobile: {
    width: '0',
    applyAtEnd: {paddingTop: '0%'}
  },
  mobile: {
    width: '112px',
  }
})

const FListItemGraphic = forwardRef((props, ref) =>
  <ListItemGraphic elementRef={ref} {...props}/>
);

const PosedTransformableListItemGraphic = posed(FListItemGraphic)({
  desktop: {
  },
  intermediateDesktop: {
  },
  intermediateMobile: {
    applyAtStart:{display: 'initial'},
    width: '32px',
    height: '32px',
    fontSize: '32px',
    marginRight: '16px',
    marginLeft: '0px',
  },
  mobile: {
    applyAtEnd:{display: 'none'},
    width: '0px',
    height: '0px',
    fontSize: '0px',
    marginRight: '32px',
    marginLeft: '-32px',
  }
})

class ContactCard extends Component{
  constructor(props){
    super(props)

    this.poseFinish = this.poseFinish.bind(this);
    this.clickMediaHandler = this.clickMediaHandler.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);

    this.state = {mobileView: true, pose: 'mobile'}
  }

  poseFinish(pose){
    if(pose === 'intermediateDesktop'){
      this.setState({pose: 'mobile'});
    }else if(pose === 'intermediateMobile'){
      this.setState({pose: 'desktop'});
    }
  }

  expand(){
    if(this.state.mobileView){
      this.setState({
        mobileView: false,
        pose: 'intermediateMobile'
      })
    }
  }

  collapse(){
    if(!this.state.mobileView){
      this.setState({
        mobileView: true,
        pose: 'intermediateDesktop'
      })
    }
  }

  clickMediaHandler(){
    if(this.props.clickable){
      if(this.state.mobileView){
        this.expand();
      } else{
        this.collapse();
      }
    }
  }

  render(){
    return(
      <React.Fragment>
        <PosedTransformableCard 
          className='contact-card' 
          pose={this.state.pose}
          onPoseComplete={(pose) => this.poseFinish(pose)}
        >
          <Ripple>
          <PosedTransformableCardMedia
            onClick={this.clickMediaHandler}
            style={{
              backgroundImage:
              'url(https://material-components-web.appspot.com/images/16-9.jpg)',
            }}
          />
          </Ripple>
          <List twoLine nonInteractive avatarList style={{flexGrow: '1'}}>
            <ListItem ripple={false}>
              <PosedTransformableListItemGraphic className='avatar-graphic' style={{backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)'}} />
              <ListItemText>
                <ListItemPrimaryText>{this.props.name}</ListItemPrimaryText>
                <ListItemSecondaryText>{this.props.title}</ListItemSecondaryText>
              </ListItemText>
            </ListItem>
            <ListItem ripple={false} className='select-all' >
              <PosedTransformableListItemGraphic icon="mail" />
              {this.props.email}
            </ListItem>
          </List>
        </PosedTransformableCard>
      </React.Fragment>
    );
  }
}

export default ContactCard;
