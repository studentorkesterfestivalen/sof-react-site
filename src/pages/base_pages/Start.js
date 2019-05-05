
import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import AboutCard from '../../components/page_components/AboutCard';
import Header from '../../components/page_components/NiceHeader';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { Link, withRouter } from 'react-router-dom'

const areaIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/area_festival/Map_small.png';
const cortegeFestivalIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg';

const festivalAboutIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/festival_about/festival1.jpg';
const cortegeAboutIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_about/cortege1.jpg';
const orchestraAboutIm =  'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/orchestra_about/orkester1.jpg';
const HistoryIm = 'http://www.lysator.liu.se/sof/sof2003/albumbilder/sof1999/lordag/Guldbrallor.jpg';

class Start extends Component{
    constructor(props){
      super(props)

      this.onTimerFinish = this.onTimerFinish.bind(this);

      this.state = {timerFinished: false, toDate: new Date('2019-01-21T00:00:00')};
    }

    static pageTitle(){
    return <FormattedMessage id='Start.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Start.navTitle' />
  }

  onTimerFinish(){
    this.setState({timerFinished: true});
  }

  render() {

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first" style={{paddingBottom: '8px'}}>
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12' >
              <img 
                className='full-width-grid-image'
                src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/start/header2.png'
              />
            </GridCell>
          </GridInner>
        </Grid>

        <HighlightedArea className='countdown-inner' color='green'
        >
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center'>
            <h2 style={{margin: '10px'}}>
              <Link to='/shop' style={{color: 'white'}}>
                <FormattedMessage id='Start.buyTicket' />
              </Link>
            </h2>
          </GridCell>
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12' >
              <Header>
                <FormattedMessage id='Start.festivalTitle' />
              </Header>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={areaIm} 
                title={<FormattedMessage id='AreaFestival.navTitle'/>}
                desc={<FormattedMessage id='About.p1'/>}
                onClickProp={()=>this.props.history.push('/festival_area')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={orchestraAboutIm}
                title={<FormattedMessage id='OrchestraAbout.navTitle'/>}
                desc={<FormattedMessage id='OrchestraAbout.p1'/>}
                onClickProp={() =>this.props.history.push('/about_orchestra')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={cortegeFestivalIm}
                title={<FormattedMessage id='CortegeFestival.navTitle'/>}
                desc={<FormattedMessage id='CortegeFestival.time'/>}
                onClickProp={()=>this.props.history.push('/festival_cortege')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={HistoryIm}
                title={<FormattedMessage id='History.navTitle'/>}
                desc={<FormattedMessage id='History.historyParagraph1'/>}
                onClickProp={() => this.props.history.push('/about_history')}
              />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12' >
              <Header>
                <FormattedMessage id='Start.moreInfo' />
              </Header>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={festivalAboutIm} 
                title={<FormattedMessage id='About.navTitle'/>}
                desc={<FormattedMessage id='About.p1'/>}
                onClickProp={()=>this.props.history.push('/about_festival')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={cortegeAboutIm}
                title={<FormattedMessage id='CortegeAbout.navTitle'/>}
                desc={<FormattedMessage id='CortegeAbout.p1'/>}
                onClickProp={()=>this.props.history.push('/about_cortege')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={orchestraAboutIm}
                title={<FormattedMessage id='OrchestraAbout.navTitle'/>}
                desc={<FormattedMessage id='OrchestraAbout.p1'/>}
                onClickProp={() =>this.props.history.push('/about_orchestra')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={HistoryIm}
                title={<FormattedMessage id='History.navTitle'/>}
                desc={<FormattedMessage id='History.historyParagraph1'/>}
                onClickProp={() => this.props.history.push('/about_history')}
              />
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(injectIntl(Start));
