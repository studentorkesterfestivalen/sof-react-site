import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';

import ContactView from '../components/ContactView';

import ContactCard from '../components/ContactCard';

const generalContact = {name: 'David Stigsmark', title: 'General', email: 'sof-general', image: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/17884242_10211261560007434_736297581860878489_n.jpg?_nc_cat=103&_nc_ht=scontent-arn2-1.xx&oh=e22d91bc70755bdb2c1bc776888ab726&oe=5CB7F5AC'}

const festivalContacts = [
  {name: 'Christina Hedner', title: 'Samordnare Festival', email: 'festival', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/41709913_2105281716171822_6319262365598613504_n.jpg?_nc_cat=104&_nc_ht=scontent-arn2-1.xx&oh=dc1696713c522ac05041c718bac8326d&oe=5CC2B418'},
  {name: 'Johan Stenström', title: 'Säkerhet', email: 'sakerhet', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/22448491_1883795608304340_7193998682892089969_n.jpg?_nc_cat=105&_nc_ht=scontent-arn2-1.xx&oh=08ffe97bf4cbb2f78f72b65f2815dcb2&oe=5CC82261'},
  {name: 'Anton Nordin', title: 'Servering', email: 'servering', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/41423876_1958769020812322_8880433492568047616_n.jpg?_nc_cat=105&_nc_ht=scontent-arn2-1.xx&oh=015ebcc6a85183b546b3a3e1d85e40c1&oe=5CCB2257'},
  {name: 'Petter Palmqvist', title: 'Område - Festival', email: 'omrade-festival', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/40106448_2055297001156486_4272783244455313408_n.jpg?_nc_cat=101&_nc_ht=scontent-arn2-1.xx&oh=c782fc4932cb779da70b1a6fb354f58d&oe=5CB63E9C'},
  {name: 'Jesper Sundström', title: 'Område - Uppbyggnad', email: 'omrade-uppbyggnad', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/45576507_2302170063338089_3263051585810333696_n.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=9add74e5b3f15bf5e6d9b7f9e811363c&oe=5CB73DF6'},
  {name: 'Johanna Samuelsson', title: 'Aktiviteter och Dekor', email: 'aktiviteter-dekor', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/10533054_842478212432048_8509145766022409337_n.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=8830a7555951382572fbee3f88fc798f&oe=5CBD87C7'},
];

const commContacts = [
  {name: 'Sofia Hagel', title: 'Samordnare Kommunikation', email: 'kommunikation', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/28166771_10216379813914422_358963408812251663_n.jpg?_nc_cat=104&_nc_ht=scontent-arn2-1.xx&oh=b0b141acdaa33eea64f6a99c4b8095fd&oe=5CCD645E'},
  {name: 'Anton Gefvert', title: 'IT', email: 'it', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/28951266_10214737770414362_1604739887913762816_n.jpg?_nc_cat=108&_nc_ht=scontent-arn2-1.xx&oh=8d67d4a6458b0986375e3e0d864d8ebd&oe=5CCE1869'},
  {name: 'Johanna Gustavsson', title: 'Samarbete & Spons', email: 'samarbete', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/36552249_10212539580907839_1980792054527033344_n.jpg?_nc_cat=105&_nc_ht=scontent-arn2-1.xx&oh=cac6bdf80fb66a03ecf79bc1d967a151&oe=5CBDD1F0'},
  {name: 'Evelyn Post', title: 'Marknadsföring', email: 'marknadsforing', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/45340063_10217893739002876_7346029986253373440_n.jpg?_nc_cat=108&_nc_ht=scontent-arn2-1.xx&oh=faf5afbb33e047bba25d5ea3b3db1d41&oe=5CBB0664'},
  {name: 'Emilia Edman', title: 'Personal', email: 'personal', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/14732167_10154101478903262_4500566499018021505_n.jpg?_nc_cat=109&_nc_ht=scontent-arn2-1.xx&oh=9083a11f64ce0c125eef6740d2f5972e&oe=5CB5405B'},
  {name: 'Erik Nordvall', title: 'Art Director', email: 'ad', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/38230751_1896570120400114_974597430299328512_n.jpg?_nc_cat=110&_nc_ht=scontent-arn2-1.xx&oh=e51033a630533e4e6e9b60657d1422fd&oe=5CC3C313'},
  {name: 'Esaias Jerrelind', title: 'Event', email: 'event', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/21106455_10155656556734451_7231260816524798548_n.jpg?_nc_cat=110&_nc_ht=scontent-arn2-1.xx&oh=5955b488a564fead7396c956df7b8857&oe=5CD94187'},
];

const orkesterContacts = [
  {name: 'Jasmine Tarander', title: 'Samordnare Orkester och Kårtege', email: 'orkesterkartege', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/19511156_10213412229364361_1325041420830410077_n.jpg?_nc_cat=105&_nc_ht=scontent-arn2-1.xx&oh=986e68b99875bab4dc5883e489729edc&oe=5CC8406D'},
  {name: 'Daniel Sonesson', title: 'Kårtege - Tåg', email: 'kartege-tag', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/14192702_10153753853137031_1124922913206552559_n.jpg?_nc_cat=101&_nc_ht=scontent-arn2-1.xx&oh=b9035c58e34900b97f08016a1ea5c78d&oe=5CC5274F'},
  {name: 'Nils Hedner', title: 'Kårtege - Byggområde', email: 'kartege-bygg', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/21740055_1786867164687720_8839954790738606018_n.jpg?_nc_cat=103&_nc_ht=scontent-arn2-1.xx&oh=b90ee9721d52f2793307acada7f855c7&oe=5CC7DC47'},
  {name: 'Filip Jaredson', title: 'Orkester', email: 'orkester', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/13731583_10206519064444998_5934238462733343952_n.jpg?_nc_cat=100&_nc_ht=scontent-arn2-1.xx&oh=2a5ab8c16dd3544e51a2606557ecd253&oe=5CB7295B'},
  {name: 'Simon Calderon', title: 'Riks-SMASK', email: 'sof-rikssmask', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/22310195_1876734322351562_3059266740092024365_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=e8d46c0d85e86b9c4bf9101b7b439d56&oe=5CCEA21E'},
];

class Contact extends Component{
  render() {

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2 style={{marginTop: '10px', marginBottom: '10px'}}> 
                General 
              </h2>
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

export default Contact;
