import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import HighlightedArea from '../components/HighlightedArea';
import SofCountdown from '../components/SofCountdown'
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import ContactCard from '../components/ContactCard';

const contactEmilia = {name: 'Emilia Edman', title: 'Personal', email: 'personal', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/hejsan.jpg'};
const contactSofia = {name: 'Sofia Hagel', title: 'Samordnare Kommunikation', email: 'kommunikation', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/aappelknyckaren.jpg'};

class Funkis extends Component{

  constructor(props) {
    super(props);
    this.intl = this.props.intl;
  };

  static pageTitle(){
    return <FormattedMessage id='Funkis.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Funkis.title' />
  }

  render() {
    return(
      <React.Fragment>
        <div id="fb-root"></div>
        <Grid className="base-outer-grid base-outer-grid--first">
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2>
                <FormattedMessage id='Funkis.t1' />
              </h2>
              <p>
                <FormattedMessage id='Funkis.p1' />
              </p>
              <p>
                <FormattedMessage id='Funkis.p2' />
              </p>
              <p>
                <FormattedMessage id='Funkis.p3' />
              </p>
              <p>
                <FormattedMessage id='Funkis.p4' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6'>
              <ContactCard
                name={contactEmilia.name}
                title={contactEmilia.title}
                email={contactEmilia.email}
                image={contactEmilia.image}
                clickable
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6'>
              <ContactCard
                name={contactSofia.name}
                title={contactSofia.title}
                email={contactSofia.email}
                image={contactSofia.image}
                clickable
              />
            </GridCell>
        </Grid>

      </React.Fragment>
    );
  }
}

export default injectIntl(Funkis, { withRef: true });
