import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import HighlightedArea from '../../components/page_components/HighlightedArea';
import SofCountdown from '../../components/page_components/SofCountdown'
import ContactCard from '../../components/page_components/ContactCard';
import Modal from '../../components/page_components/Modal';

import { connect } from 'react-redux';

import { ListDivider } from '@rmwc/list';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import { SimpleDataTable } from '@rmwc/data-table';


const contactEmilia = {name: 'Emilia Edman', title: 'Personal', email: 'personal', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/hejsan.jpg'};
const contactSofia = {name: 'Sofia Hagel', title: 'Samordnare Kommunikation', email: 'kommunikation', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/aappelknyckaren.jpg'};


class Funkis extends Component{

  constructor(props) {
    super(props);
    this.intl = this.props.intl;

    this.state = {formOpen: false, formLoading: true}
  };

  closeModal = () =>{
    this.setState({formOpen: false});
  }

  static pageTitle(){
    return <FormattedMessage id='Funkis.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Funkis.title' />
  }

  render() {
    return(
      <React.Fragment>
        <Modal
          isOpen={this.state.formOpen}
          exitCallback={() => this.closeModal()}
        >
          {this.state.formLoading ? <CircularProgress size="large" style={{color: 'white', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto'}}/> : null}
          <iframe 
            onLoad={() => this.setState({formLoading: false})}
            src="https://docs.google.com/forms/d/e/1FAIpQLScOcFdNFkMw1wffnmyhzhRAVFPxkLVyckPPBp6TZNQ143Bnkw/viewform?embedded=true" 
            style={{height: '80vh', width: '100%', maxWidth: '700px'}}
            frameBorder={0}
            marginHeight="0" 
            marginWidth="0"
          >
              Läser in...
          </iframe>
        </Modal>
        
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2 style={{marginTop: '16px'}}>
                <FormattedMessage id='Funkis.t1' />
              </h2>
              {this.props.lang === 'en' ? <b> This page is not available in english, sorry! </b> : null }
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
                <FormattedMessage id='Funkis.obs' />
              </p>
            </GridCell>
          </GridInner>
        </Grid>
        <HighlightedArea className='countdown-inner' color='green'
        >
          <SofCountdown 
            label={<FormattedMessage id='Funkis.timeLeft' />}
            toDate={new Date('2019-04-14T23:59:59')} />
          <GridCell phone='4' tablet='8' desktop='12' >
            <ListDivider/>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center'>
            <Button 
              raised 
              onClick={() => this.setState({formOpen: !this.state.formOpen, formLoading: true})} 
              style={{width: '100%'}}
            >
              <FormattedMessage id='Funkis.register' /> 
            </Button>
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
          <GridInner>
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
            <GridCell phone="4" tablet="8" desktop='12'>
              <p> Nedan ser ni vilka arbetspass som ger gratis inträde till vilken dag. </p>
              <SimpleDataTable
                className='rmwc-table-full-width rmwc-table-uninteractive'
                getRowProps={(row, index, isHead) => {}}
                getCellProps={(cell, index, isHead) => {
                  return {style: {whiteSpace: 'normal', padding: '8px'}}
                }}
                headers={[['Funkiskategori', 'Pass', 'Gratis biljett']]}
                data={
                  [
                    ['Festival', '8/9/10 maj','Lördag'],
                    ['Festival', '11 maj','Torsdag + fredag'],
                    ['Orkester', '8/9/10 maj','Lördag'],
                    ['Orkester', '11 maj','Torsdag + fredag'],
                    ['Byggfunkis', '4/5/6/7/8/9 maj','Torsdag + fredag'],
                    ['Rivfunkis', '12/13/14 maj','Torsdag + fredag'],
                    ['Nattvakt', '4/5/6/7/8 maj','Lördag'],
                    ['Orkesterfadder', '9/10/11/12 maj','Helhelg'],
                  ]
                }
              />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <h2>
                <FormattedMessage id='Funkis.t3' />
              </h2>
              <p>
                <FormattedMessage id='Funkis.p6' />
              </p>
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <h4 style={{margin: '0px'}}>
                <FormattedMessage id='Funkis.festivalTitle' />
              </h4>
              <p>
                <FormattedMessage id='Funkis.festival' />
              </p>
              <GridInner>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.festivalFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.festivalFunk' />
                  </p>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.foodFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.foodFunk' />
                  </p>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.entryFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.entryFunk' />
                  </p>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.chaffFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.chaffFunk' />
                  </p>
                </GridCell>
              </GridInner>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h4 style={{margin: '0px'}}>
                <FormattedMessage id='Funkis.orchestraTitle' />
              </h4>
              <p>
                <FormattedMessage id='Funkis.orchestra' />
              </p>
              <GridInner>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.orchFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.orchFunk' />
                  </p>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.sceneFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.sceneFunk' />
                  </p>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.livingFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.livingFunk' />
                  </p>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.cortegeFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.cortegeFunk' />
                  </p>
                </GridCell>
              </GridInner>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h4 style={{margin: '0px'}}>
                <FormattedMessage id='Funkis.buildTitle' />
              </h4>
              <p>
                <FormattedMessage id='Funkis.build' />
              </p>
              <GridInner>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.buildFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.buildFunk' />
                  </p>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.tearFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.tearFunk' />
                  </p>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='6'>
                  <h6 style={{margin: '0px'}}>
                    <FormattedMessage id='Funkis.nightFunkTitle' />
                  </h6>
                  <p>
                    <FormattedMessage id='Funkis.nightFunk' />
                  </p>
                </GridCell>
              </GridInner>
            </GridCell>
          </GridInner>
        </Grid>

      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state.locale.lang,
  };
}

export default connect(mapStateToProps)(injectIntl(Funkis, { withRef: true }));
