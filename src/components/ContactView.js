import React, { Component } from 'react';

import ContactCard from './ContactCard';

import { GridCell, GridInner } from '@rmwc/grid';


class ContactsView extends Component{

  render(){
    const contactCards = this.props.contacts.map((contact) =>
      <GridCell tablet='4' phone='4' desktop='6'>
        <ContactCard name={contact.name} title={contact.title} email={contact.email} />
      </GridCell>
    );

    return(
      <React.Fragment>
        <GridInner>
            <GridCell phone="4" tablet="8" desktop='12' className='h-align'>
              <h2 style={{marginBottom: '0'}}>
                {this.props.title}
              </h2>
            </GridCell>

            {contactCards}

        </GridInner>
      </React.Fragment>
    );
  }

}

export default ContactsView;
