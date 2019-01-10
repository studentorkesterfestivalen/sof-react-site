import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';

import ContactView from '../components/ContactView';


const testContacts = [
  {name: '111', title: 'IT', email: 'it@sof.lintek.nu'},
  {name: '222', title: 'Gennyral', email: 'general@sof.lintek.nu'},
  {name: '333', title: 'IT', email: 'it@sof.lintek.nu'},
  {name: '444', title: 'IT', email: 'it@sof.lintek.nu'},
  {name: '555', title: 'IT', email: 'it@sof.lintek.nu'},
  {name: '666', title: 'IT', email: 'it@sof.lintek.nu'}
];

class Contact extends Component{
  render() {

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView title='Festival' contacts={testContacts} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12' className='h-align'>
              <ListDivider/>
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView title='Kommunikation' contacts={testContacts} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12' className='h-align'>
              <ListDivider/>
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView title='Orkester och Kårtege' contacts={testContacts} />
            </GridCell>

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Contact;
