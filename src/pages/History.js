import React, { Component, forwardRef } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';

class History extends Component{

  constructor(props) {
    super(props);
    this.intl = this.props.intl;
  };

  render(){
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              { /*<h1>
                <FormattedMessage
                  id="History.historyHeading"
                  defaultMessage="SOFs Historia"
                />
              </h1> */ }
              <p>
                <FormattedMessage
                  id="History.historyParagraph1"
                  defaultMessage="Studentorkesterfestivalen gick för allra första gången av stapeln år 1973
                  i Linköping. SOF anordnades av LinTek i Linköping varje år fram till 1977,
                  då Uppsala tog sig an uppdraget att anordna festivalen, men under namnet
                  STORK. Sedan dess har SOF arrangerats i Linköping under udda år och har
                  vuxit till en av norra Europas största studentfestivaler, med besökande
                  från hela Sverige och norra Europa."
                />
              </p>

              <p>
                <FormattedMessage
                  id="History.historyParagraph2"
                  defaultMessage="Under en helg i december 1972 grundades Riks-SMASK på ett hotell i Södertälje.
                  Styrelsen beslutade samma helg att en årlig studentorkesterfestivalen borde
                  anordnas och platsen för denna festival blev Linköping. Studentorkesterfestivalen
                  anordnas fortfarande varje år i uppdrag av Riks-SMASK. SMASK:et i Riks-SMASK
                  står för Sveriges Musicerande Akademikers Samarbetande Kårorkestrar och Riks-SMASK
                  är en samlingsorganisation för alla studentorkestrar och studentbaletter vid
                  Sveriges universitet och högskolor."
                />
              </p>
              <p>
                <FormattedMessage
                  id="History.historyParagraph3"
                  defaultMessage="Tutputten är namnet som Riks-SMASKs maskot bär. Tutputten är en vit huvudfoting
                  som för första gången visade sig år 1975 i Linköping. Tutputtens ursprung är än idag okänt."
                />
              </p>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    )
  }
}


export default injectIntl(History);
