import React, { Component, forwardRef } from 'react';

import HighlightedArea from '../components/HighlightedArea'

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { ListDivider } from '@rmwc/list';

class SofCountdown extends Component {
  constructor(props){
    super(props);

    this.updateTime = this.updateTime.bind(this);

    this.state = {timeLeft: {}};
  }

  secondsToTime(secs) {
    let days = Math.floor(secs / (24 * 60 * 60));

    let divisor_for_hours = secs % (24 * 60 * 60);
    let hours = Math.floor(divisor_for_hours / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "d": days,
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  updateTime() {
    var now = new Date();
    let seconds = (this.props.toDate.getTime() - now.getTime())/1000;
    this.setState({timeLeft: this.secondsToTime(seconds)});
  }

  render(){
    return(
      <React.Fragment>
        <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
          <h1 style={{margin: '0'}}>
            {this.props.label}
          </h1>
        </GridCell>

        <GridCell phone='4' tablet='8' desktop='12' >
          <ListDivider/>
        </GridCell>

        <GridCell phone="4" tablet="4" desktop='3' className='h-center'>
          <h1 style={{margin: '0'}}>
            {this.state.timeLeft.d} <br className='hide-mobile' /> DAGAR
          </h1>
        </GridCell>

        <GridCell phone="4" tablet="4" desktop='3' className='h-center'>
          <h1 style={{margin: '0'}}>
            {this.state.timeLeft.h} <br className='hide-mobile' /> TIMMAR
          </h1>
        </GridCell>

        <GridCell phone="4" tablet="4" desktop='3' className='h-center'>
          <h1 style={{margin: '0'}}>
            {this.state.timeLeft.m} <br className='hide-mobile' /> MINUTER
          </h1>
        </GridCell>

        <GridCell phone="4" tablet="4" desktop='3' className='h-center'>
          <h1 style={{margin: '0'}}>
            {this.state.timeLeft.s} <br className='hide-mobile' /> SEKUNDER
          </h1>
        </GridCell>
      </React.Fragment>
    )
  }
}

export default SofCountdown;
