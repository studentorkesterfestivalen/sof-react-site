import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';
import ImageModal from '../../components/page_components/ImageModal';
import SofCountdown from '../../components/page_components/SofCountdown'
import StageCard from '../../components/page_components/StageCard';

import { stageOne, stageTwo, stageThree, stageFour } from '../../orchestraConstants';

import { FormattedMessage, injectIntl } from 'react-intl'

import { withRouter } from 'react-router-dom'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Ripple } from '@rmwc/ripple';
import { ListDivider } from '@rmwc/list';
import { SimpleDataTable } from '@rmwc/data-table';
import { Button } from '@rmwc/button';
import {
  List,
  ListGroup,
} from '@rmwc/list';


function findCurrent(stage){
  var i = 0;
  var b = false;
  const now = new Date();
  while (i < stage.length - 1 && Date.parse(stage[i].end) < now){
    i++;
  }
  if(Date.parse(stage[i].start) > now){
    b = true
  }
  return [i, b];
}


class ScheduleFestival extends Component{
  constructor(props){
    super(props)

    this.state = {
      stageOneS: [null, null], 
      stageTwoS: [null, null], 
      stageThreeS: [null, null], 
      stageFourS: [null, null]}
  }

  static pageTitle(){
    return <FormattedMessage id='ScheduleFestival.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='ScheduleFestival.navTitle' />
  }

  componentDidMount() {
    this.updatePages();
    this.timer = setInterval(this.updatePages, 120000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  updatePages = () => {
    const stageOneCurrent = findCurrent(stageOne);
    const stageTwoCurrent = findCurrent(stageTwo);
    const stageThreeCurrent = findCurrent(stageThree);
    const stageFourCurrent = findCurrent(stageFour);
    console.log('--------');
    console.log(stageOneCurrent);
    console.log(stageTwoCurrent);
    this.setState({
      stageOneS: stageOneCurrent, 
      stageTwoS: stageTwoCurrent, 
      stageThreeS: stageThreeCurrent, 
      stageFourS: stageFourCurrent
    });
  }

  render() {
    /*const stageOneCurrent = findCurrent(stageOne);
    const stageTwoCurrent = findCurrent(stageTwo);
    const stageThreeCurrent = findCurrent(stageThree);
    const stageFourCurrent = findCurrent(stageFour);*/
    const stageOneCurrent = this.state.stageOneS;
    const stageTwoCurrent = this.state.stageTwoS;
    const stageThreeCurrent = this.state.stageThreeS;
    const stageFourCurrent = this.state.stageFourS;


    console.log('***********');
    console.log(stageOneCurrent);
    console.log(stageTwoCurrent);
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <img
                className = 'full-width-grid-image'
                src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/schedule_festival/schedule1.jpg'
                alt=''
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' style={{marginTop: '16px'}}>
              <Header>
                <FormattedMessage id='ScheduleFestival.stages' />
              </Header>
              <p>
                <FormattedMessage id='ScheduleFestival.text' />
              </p>
              <p>
                <FormattedMessage id='ScheduleFestival.text2' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='6'>
              <StageCard 
                stageNum='1'
                stageName='Bullerbyn'
                stageList={stageOne}
                current={stageOneCurrent[0]}
                break={stageOneCurrent[1]}
                url='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/schedules/Spelschema_Bullerbyn.pdf'
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='6'>
              <StageCard 
                stageNum='2'
                stageName='Nangijala'
                stageList={stageTwo}
                current={stageTwoCurrent[0]}
                break={stageTwoCurrent[1]}
                url='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/schedules/Spelschema_Nangijala.pdf'
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='6'>
              <StageCard 
                stageNum='3'
                stageName='Lönneberga'
                stageList={stageThree}
                current={stageThreeCurrent[0]}
                break={stageThreeCurrent[1]}
                url='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/schedules/Spelschema_lonneberga.pdf'
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='6'>
              <StageCard 
                stageNum='4'
                stageName='Saltkråkan'
                stageList={stageFour}
                current={stageFourCurrent[0]}
                break={stageFourCurrent[1]}
                url='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/schedules/Spelschema_Saltkrakan.pdf'
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
              <ListDivider style={{width: '100%'}}/>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
              <a
                href='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/schedules/Spelschema_komplett.pdf'
              >
                <h4 style={{margin: '0'}}> 
                  <FormattedMessage id='ScheduleFestival.fullS'/>
                </h4>
              </a>
            </GridCell>

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(injectIntl(ScheduleFestival));
