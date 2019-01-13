import React, { Component, forwardRef } from 'react';

import ContactCard from './ContactCard';

import { GridCell, GridInner } from '@rmwc/grid';

import posed, {PoseGroup} from 'react-pose';

import { Ripple } from '@rmwc/ripple';

import { Icon } from '@rmwc/icon';

const FGridInner = forwardRef((props, ref) =>
  <GridInner elementRef={ref} {...props}>
    {props.children}
  </GridInner>
);

const PosedCollapsableGridInner = posed(FGridInner)({
  open:{
    height: 'auto',
    transition: {duration: 200},
    beforeChildren: true,
  },
  collapsed:{
    height: '0px',
    transition: {duration: 200},
  }
});

const FGridCell = forwardRef((props, ref) =>
  <GridCell elementRef={ref} {...props}>
    {props.children}
  </GridCell>
);

const PosedCollapsableGridCell = posed(FGridCell)({
  open:{
    applyAtEnd:{overflow: 'visible'},

  },
  collapsed:{
    applyAtStart:{overflow: 'hidden'},
  },
});

const FIcon = forwardRef((props, ref) =>
  <Icon elementRef={ref} {...props} />
);

const PosedCollapsableIcon = posed(FIcon)({
  open:{
    rotate: 0,
    transition: {duration: 200},
  },
  collapsed:{
    rotate: -180,
    transition: {duration: 200},
  },
});

class ContactsView extends Component{
  constructor(props){
    super(props);

    this.handleAllClick = this.handleAllClick.bind(this);

    this.state = {collapsed: false};
  }

  handleAllClick(){
    console.log('click');
  }

  render(){
    const contactCards = this.props.contacts.map((contact) =>
      <PosedCollapsableGridCell tablet='4' phone='4' desktop='6' key={contact.name}>
        <ContactCard 
          name={contact.name} 
          title={contact.title} 
          email={contact.email} 
          clickable
          allClickCallback={() => this.handleAllClick()}
        />
      </PosedCollapsableGridCell>
    );

    return(
      <React.Fragment>
        <GridInner>
          <Ripple >
            <GridCell phone="4" tablet="8" desktop='12' 
              className='h-align' 
              onClick={()=>this.setState({collapsed: !this.state.collapsed})} 
              style={{display: 'flex', justifyContent: 'space-between'}}
            >
              <h2 style={{marginBottom: '10px', marginTop: '10px'}} >
                {this.props.title}
              </h2>

              <PosedCollapsableIcon 
                icon='expand_less' 
                style={{alignSelf: 'center', fontSize: '32px'}} 
                pose={this.state.collapsed ? 'collapsed' : 'open'}
              />
            </GridCell>
          </Ripple>

          <GridCell phone="4" tablet="8" desktop='12' className='h-align'>
            <PosedCollapsableGridInner pose={this.state.collapsed ? 'collapsed' : 'open'}>
              {contactCards}
            </PosedCollapsableGridInner>
          </GridCell>

        </GridInner>
      </React.Fragment>
    );
  }

}

export default ContactsView;
