import React, { Component, forwardRef } from 'react';

import ContactCard from './ContactCard';

import { GridCell, GridInner } from '@rmwc/grid';

import posed, {PoseGroup} from 'react-pose';

const FGridInner = forwardRef((props, ref) =>
  <GridInner elementRef={ref} {...props}>
    {props.children}
  </GridInner>
);

const PosedCollapsableGridInner = posed(FGridInner)({
  open:{
    staggerChildren: 100,
  },
  collapsed:{
    staggerChildren: 100,
    staggerDirection: -1
  }
});

const FGridCell = forwardRef((props, ref) =>
  <GridCell elementRef={ref} {...props}>
    {props.children}
  </GridCell>
);

const PosedCollapsableGridCell = posed(FGridCell)({
  open:{
    applyAtStart: {display: 'block', zIndex: 0},
    y: '0%',
    opacity: 1,
    transition: {duration: 1000},

  },
  collapsed:{
    y: '-20%',
    opacity: 0,
    applyAtEnd: {display: 'none'},
    transition: {duration: 100}
  },
});

class ContactsView extends Component{
  constructor(props){
    super(props);

    this.state = {collapsed: false};
  }

  render(){
    const contactCards = this.props.contacts.map((contact) =>
      <PosedCollapsableGridCell tablet='4' phone='4' desktop='6'>
        <ContactCard name={contact.name} title={contact.title} email={contact.email} clickable />
      </PosedCollapsableGridCell>
    );

    return(
      <React.Fragment>
        <PosedCollapsableGridInner pose={this.state.collapsed ? 'collapsed' : 'open'}>
          <GridCell phone="4" tablet="8" desktop='12' className='h-align'>
            <h2 style={{marginBottom: '0'}} onClick={()=> this.setState({collapsed: !this.state.collapsed})}>
              {this.props.title}
            </h2>
          </GridCell>

          {contactCards}

        </PosedCollapsableGridInner>
      </React.Fragment>
    );
  }

}

export default ContactsView;
