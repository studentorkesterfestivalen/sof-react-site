import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';

import { FormattedMessage, injectIntl } from 'react-intl'

import ContactView from '../components/ContactView';

import ContactCard from '../components/ContactCard';

const generalContact = {name: 'David Stigsmark', title: 'General', email: 'sof-general', image: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/david.jpg'}

const festivalContacts = [
  {name: 'Christina Hedner', title: 'Samordnare Festival', email: 'festival', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/christina.jpg'},
  {name: 'Johan Stenström', title: 'Säkerhet', email: 'sakerhet', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/johan.jpg'},
  {name: 'Anton Nordin', title: 'Servering', email: 'servering', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/anton_n.jpg'},
  {name: 'Petter Palmqvist', title: 'Område - Festival', email: 'omrade-festival', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/petter.jpg'},
  {name: 'Jesper Sundström', title: 'Område - Uppbyggnad', email: 'omrade-uppbyggnad', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/jesper.jpg'},
  {name: 'Johanna Samuelsson', title: 'Aktiviteter och Dekor', email: 'aktiviteter-dekor', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-homepage/logos/sof_favicon.png'},
];

const commContacts = [
  {name: 'Sofia Hagel', title: 'Samordnare Kommunikation', email: 'kommunikation', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/sofia.jpg'},
  {name: 'Anton Gefvert', title: 'IT', email: 'it', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/anton_g.jpg'},
  {name: 'Johanna Gustavsson', title: 'Samarbete & Spons', email: 'samarbete', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-homepage/logos/sof_favicon.png'},
  {name: 'Evelyn Post', title: 'Marknadsföring', email: 'marknadsforing', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/evelyn.jpg'},
  {name: 'Emilia Edman', title: 'Personal', email: 'personal', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-homepage/logos/sof_favicon.png'},
  {name: 'Erik Nordvall', title: 'Art Director', email: 'ad', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-homepage/logos/sof_favicon.png'},
  {name: 'Esaias Jerrelind', title: 'Event', email: 'event', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/esaias.jpg'},
];

const orkesterContacts = [
  {name: 'Jasmine Tarander', title: 'Samordnare Orkester och Kårtege', email: 'orkesterkartege', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/jasmine.jpg'},
  {name: 'Daniel Sonesson', title: 'Kårtege - Tåg', email: 'kartege-tag', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/daniel.jpg'},
  {name: 'Nils Hedner', title: 'Kårtege - Byggområde', email: 'kartege-bygg', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/nisse.jpg'},
  {name: 'Filip Jaredson', title: 'Orkester', email: 'orkester', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/filip.jpg'},
  {name: 'Simon Calderon', title: 'Riks-SMASK', email: 'sof-rikssmask', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/simon.jpg'},
];

class Contact extends Component{

  static pageTitle(){
    return <FormattedMessage id='Contact.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Contact.navTitle' />
  }

  render() {

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
              <GridCell phone="4" tablet="8" desktop='12'>
              <h4 style={{marginTop: '10px', marginBottom: '10px'}}> 
                General 
              </h4>
            </GridCell>
            {/* padding for centering of contact*/}
            <GridCell phone='0' tablet='1' desktop='3' className = 'hide-mobile'> </GridCell>
            <GridCell phone="4" tablet="6" desktop='6'>
              <ContactCard
                name={generalContact.name} 
                title={generalContact.title} 
                email={generalContact.email} 
                image={generalContact.image}
                mailSuffix="@lintek.liu.se"
              />
            </GridCell>
            <GridCell phone='0' tablet='1' desktop='3' className = 'hide-mobile'> </GridCell>

            <GridCell phone="4" tablet="8" desktop='12' className='h-align'>
              <ListDivider/>
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Festival' 
                contacts={festivalContacts} 
                isMobile={this.props.isMobile} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12' className='h-align'>
              <ListDivider/>
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Kommunikation' 
                contacts={commContacts} 
                isMobile={this.props.isMobile} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12' className='h-align'>
              <ListDivider/>
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Orkester och Kårtege' 
                contacts={orkesterContacts} 
                isMobile={this.props.isMobile} />
            </GridCell>

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(Contact);
