import React, { Component } from 'react';
import Navbar from './components/navigation';
import Content from './components/Content';
import ErrorBoundary from './components/ErrorBoundary'

import {ThemeProvider} from '@rmwc/theme';

import { Grid, GridCell, GridInner } from '@rmwc/grid';

class App extends Component {
  constructor(props){
    super(props)

    this.changeLanguage = this.changeLanguage.bind(this);

    this.state = {lang: 'sv'};
  }

  changeLanguage(lang){
    this.setState({lang: lang});
  }

  render() {

    const testLanguageStr = (this.state.lang === 'sv' ? "Sätt in text här och skit" : "Put text here and stuff");

    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"/>
        <ThemeProvider options={{
          primary: '#FF0000',
          secondary: '#0c726f'
        }}>
          <Navbar lang={this.state.lang} changeLanguage={this.changeLanguage}/>

          <div className='colorboi'></div>

          <div className='base-outer'>
            <Grid className="base-outer-grid">
              <GridInner className="base-inner-grid">
                <GridCell phone="4" desktop='12'>
                  <div className="main-text-area">
                    { /*testLanguageStr */}
                    <br/>
                    <h1> Header 1 </h1>
                    <h2> Header 2 </h2>
                    <h3> Header 3 </h3>
                    <h4> Header 4 </h4>
                    <a href="google.se"> Länk</a> <br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu dictum turpis, eu facilisis leo. Proin non metus vel risus fermentum facilisis vel eget ex. Curabitur egestas erat vel porta rhoncus. Donec justo mi, mattis a luctus ac, feugiat vitae eros. Integer sodales dolor justo, cursus finibus massa dignissim nec. Quisque ac suscipit odio. Quisque eget nisl vitae est dignissim venenatis et vitae turpis. In semper, purus a sodales facilisis, eros justo consequat nisl, sed molestie magna purus ut neque. Fusce at mi at metus elementum condimentum ut ac nunc. Nunc porta faucibus ligula, non cursus ipsum faucibus at. Sed venenatis lectus ac tortor pretium, accumsan finibus quam finibus. Mauris nec ante tincidunt purus congue pellentesque. Morbi ac facilisis nibh, ac faucibus ipsum. Cras metus arcu, iaculis at elementum sed, ultricies sit amet ante.

Curabitur ullamcorper augue vitae libero venenatis suscipit. Maecenas laoreet velit dapibus augue congue, in ultricies enim dapibus. Donec egestas in mi et vestibulum. Fusce orci lectus, posuere eu pretium quis, pharetra id lectus. Morbi vehicula, tortor vitae elementum dapibus, arcu lacus faucibus tellus, vel ornare odio dolor ultricies erat. Quisque tempus mauris id finibus pharetra. Pellentesque sed ultricies odio. Aliquam nec ligula in metus gravida eleifend. In viverra gravida sapien ac finibus. Sed rhoncus malesuada diam ac pulvinar. Maecenas suscipit eros quis arcu varius luctus. Nulla vestibulum, orci quis ultrices mollis, elit sem aliquet arcu, quis tristique magna dolor quis dui. Phasellus sed orci ut lorem accumsan venenatis et ut purus. In eget arcu id dui rhoncus rutrum. Mauris posuere erat vitae dolor ultrices, vestibulum posuere eros dictum.

Vivamus congue leo ac feugiat pulvinar. Vivamus fringilla luctus mauris, eget fringilla risus tempus quis. Nullam hendrerit a felis vitae venenatis. Integer dignissim vehicula lacus, sit amet rhoncus odio tincidunt eget. Sed rhoncus, est ac hendrerit auctor, lorem elit iaculis nisl, et suscipit nisl dolor vitae sem. Nulla vitae augue quis massa tristique aliquet. Quisque at leo placerat, mattis leo volutpat, consequat erat. Curabitur ligula nisi, iaculis aliquam orci convallis, malesuada semper libero. Nam ac semper risus. Aliquam ac nibh venenatis, euismod elit et, volutpat metus. Praesent pretium elit auctor vulputate lobortis. Cras diam tellus, faucibus nec turpis ut, venenatis mattis orci. Vivamus congue neque metus, vel consectetur elit aliquam sed.

Duis consequat magna vitae commodo venenatis. Ut tempus iaculis massa eu laoreet. Fusce sit amet egestas mauris, non interdum sem. Sed dolor dolor, bibendum vitae malesuada quis, tincidunt non magna. Nullam ac viverra nibh. Phasellus eget purus erat. Cras id nisl neque. Ut sit amet bibendum sapien, sed varius ex.

Fusce blandit eros a diam scelerisque porttitor. Sed sit amet turpis ut tellus faucibus lobortis. Vivamus posuere finibus dolor sed ultricies. Vestibulum augue arcu, porta a velit et, mollis efficitur nibh. Aliquam eu tellus turpis. Mauris pulvinar libero eget mauris consectetur, eget sodales sem scelerisque. Maecenas sodales justo ac ex scelerisque, vitae gravida lorem dictum. Mauris ut lacus tempus, egestas nunc non, congue tortor. Aenean sit amet venenatis nisi, nec sagittis lectus. Etiam sapien ante, pharetra quis purus in, convallis egestas odio. Cras a ex volutpat sapien aliquet egestas at dignissim dui. Etiam mi odio, iaculis vitae risus id, consectetur auctor elit. Duis cursus gravida dolor, sit amet malesuada ligula posuere a.
                  </div>
                </GridCell>
              </GridInner>
            </Grid>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
