import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import HighlightedArea from '../components/HighlightedArea';
import SofCountdown from '../components/SofCountdown'
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import ContactCard from '../components/ContactCard';
import { ListDivider } from '@rmwc/list';

import posed from 'react-pose';

const contactEmilia = {name: 'Emilia Edman', title: 'Personal', email: 'personal', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/hejsan.jpg'};
const contactSofia = {name: 'Sofia Hagel', title: 'Samordnare Kommunikation', email: 'kommunikation', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/aappelknyckaren.jpg'};


const PosedForm = posed.div({
  open: {
    height: '1400px',
    applyAtStart:{display: 'initial', overflow: 'hidden'},
  },
  closed: {
    height: '0px',
    applyAtEnd:{display: 'none'},
  },
});

class Funkis extends Component{

  constructor(props) {
    super(props);
    this.intl = this.props.intl;

    this.state = {formOpen: false}
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
            </GridCell>
        </Grid>
        <HighlightedArea className='countdown-inner' color='green'
        >
          <SofCountdown 
            label={<FormattedMessage id='Funkis.timeLeft' />}
            toDate={new Date('2019-05-09T08:00:00')} />
          <GridCell phone='4' tablet='8' desktop='12' >
            <ListDivider/>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center'>
            <h4 style={{margin: '10px'}}>
              <b onClick={() => this.setState({formOpen: !this.state.formOpen})} style={{color: 'white', cursor: 'pointer'}} >
                <FormattedMessage id='Funkis.register' /> 
              </b>
            </h4>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center' style={{height: '100%'}}>
            <PosedForm 
              style={{width: '100%'}}
              pose={this.state.formOpen? 'open' : 'closed'}
            >
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLScOcFdNFkMw1wffnmyhzhRAVFPxkLVyckPPBp6TZNQ143Bnkw/viewform?embedded=true" 
                style={{height: '100%', width: '100%'}}
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0"
              >
                  Läser in...
              </iframe>
            </PosedForm>
          </GridCell>
          {/*(!this.state.timerFinished) ?
              <GridCell span='12'>
                <Button
                  raised
                  style={{width: '100%'}}
                  onClick={() => this.setState({toDate: new Date(Date.now() + 2000)})} 
                > 
                  Press to test timer 
                </Button>
              </GridCell>
              : ''
              */}
        </HighlightedArea>
        <Grid className="base-outer-grid ">
            <GridCell phone="4" tablet="8" desktop='12'>
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
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2>
                <FormattedMessage id='Funkis.t2' />
              </h2>
              <p>
                <FormattedMessage id='Funkis.p5' />
              </p>
            </GridCell>
        </Grid>

      </React.Fragment>
    );
  }
}

export default injectIntl(Funkis, { withRef: true });
