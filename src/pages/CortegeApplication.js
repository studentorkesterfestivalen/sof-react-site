import React, { Component, forwardRef } from 'react';

import HighlightedArea from '../components/HighlightedArea';
import SofCountdown from '../components/SofCountdown'

import ContactCard from '../components/ContactCard';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Ripple } from '@rmwc/ripple';

const contactDaniel = {name: 'Daniel Sonesson', title: 'Kårtege - Tåg', email: 'kartege-tag', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/14192702_10153753853137031_1124922913206552559_n.jpg?_nc_cat=101&_nc_ht=scontent-arn2-1.xx&oh=b9035c58e34900b97f08016a1ea5c78d&oe=5CC5274F'};
const contactNils = {name: 'Nils Hedner', title: 'Kårtege - Byggområde', email: 'kartege-bygg', image:'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/21740055_1786867164687720_8839954790738606018_n.jpg?_nc_cat=103&_nc_ht=scontent-arn2-1.xx&oh=b90ee9721d52f2793307acada7f855c7&oe=5CC7DC47'};

class CortegeApplication extends Component{
  render() {
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>

                När ansökan öppnar kommer ni kunna anmäla er just precis här! Ansökan öppnar 4/2!
              </p>
            </GridCell>
          </GridInner>
        </Grid>

        <HighlightedArea className='countdown-inner' color='green'>
          <SofCountdown label="TID KVAR TILLS ANSÖKAN ÖPPNAR" toDate={new Date('2019-02-04T00:00:00')} />
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2>
                Viktiga Datum
              </h2>
              <p>
                Nedan följer några viktiga datum under både Kårtegeansökan och inför själva Kårtegen:<br/><br/>
                20/1 - Temasläpp för Kårtegen 2019<br/>
                4/2 - Ansökan öppnar!<br/>
                5/2 - Kårtegepub i Gasquen.<br/>
                17/2 - Ansökan stänger!<br/>
                2/5 - Byggstartsfest.<br/>
                9/5 - SOF19 börjar.<br/>
                10/5 - Sista byggdag.<br/>
                11/5 - Kårtegen 2019 går av stapeln!
              </p>

              <h2>
                Bidragsinformation
              </h2>
              <p>
                För att ni ska ha möjlighet att förbereda er inför att ansökan öppnar följer nedan praktisk information.
                Ansökan kommer att vara öppen från <b>4/2</b> till <b>17/2</b> men för att maximera chansen att just ert bidrag ska få vara med i Kårtegen är det bra att skicka in en ansökan tidigt vartefter vi i Kårtegeutskottet kanske hinner titta igenom och komma med feedback redan innan ansökan stänger.
              </p>

              <h2>
                Ansökans delar
              </h2>
              <p>
                En ansökan innehåller utöver information om er grupp tre delar:
              </p>
              <ul>
                <li>En grovskiss över bidraget.</li>
                <li>En beskrivning av bidraget och vad det innehåller.</li>
                <li>En förklaring hur bidraget hänger ihop med Kårtegens tema.</li>
              </ul>

              <p>
                Det är just beskrivningen och hur bra ert bidrag passar in i årets tema vi i Kårtegeutskottet kommer att kolla på när vi bestämmer vilka som får möjlighet att vara med i Kårtegen.
                <br/>
                <b>Tips!</b> Försök tänka utanför ramarna, det kommer inte godkännas bidrag som har samma idé.
              </p>

              <p>
                När ansökan stänger kommer vi i Kårtegeutskottet gå igenom alla bidrag och välja ut de vi tycker är bäst lämpade. Om ansökan blir godkänd så kommer vi då be om en mer utförlig ritning samt planerad materialåtgång och ytterligare information.
              </p>

              <p>
                <b>OBS!</b> Årets Kårtege kommer att innehålla färre bidrag (men med högre kvalité) än tidigare år. Detta innebär att endast de med bäst idé och koppling till temat kommer att få möjlighet att vara med. Se därför till att ni gör ert allra bästa med beskrivning och skiss.
              </p>

              <h2> Typer av bidrag </h2>
              <p> De typer av bidrag som kommer att finnas i Kårtegen 2019 är: </p>

              <h4> Makrobidrag </h4>
              <p>
                Ett makrobidrag innebär en konstruktion som transporteras på ett lastbilsflak under Kårtegen där deltagarna är på flaket med sin konstruktion.
                För ett makrobidrag rekommenderar vi att man är en grupp på 15-25 personer.
                Är man fler eller färre kontakta gärna oss för att kolla om det fungerar.
                Maximal byggstorlek för ett makrobidrag är <b>5</b> meter långt, <b>2.5</b> meter brett och <b>3</b> meter högt.
              </p>

              <h4> Fribygge </h4>
              <p>
                Ett fribygge är alla andra sorters bidrag än makrobidrag och för dessa krävs en beskrivning av vad man vill bygga och speciellt godkännande. För att diskutera just er fribygge-idé får ni gärna kontakta oss i Kårtegeutskottet redan innan ansökan öppnar.
              </p>

              <h2> Kostnad </h2>
              <p>
                Kostnaden för att vara med i Kårtegen och ha ett bidrag beror på vilket typ av bidrag man vill ha och antalet personer man är i gruppen.
              </p>

              <p>
                Ett makrobidrag kommer att kosta 8000kr plus 400kr per person i gruppen. I detta ingår:
              </p>

              <ul>
                <li>Material att bygga bidraget med</li>
                <li>En egen byggplats på byggområdet samt tillgång till verktyg</li>
                <li>Chansen att få visa upp sitt färdiga bidrag för hela Linköping</li>
                <li>Ett speciellt Kårtege-helhelgsarmband till varje person i gruppen. (Biljett till alla tre kvällar av SOF19)</li>
                <li> Byggstartsfesten 2/5</li>
                <li>Ett SOF19-märke</li>
                <li>En massa annat kul!</li>
              </ul>

              <p>
                För grundkostnad för fribygge kontakta oss i Kårtegeutskottet med information om storlek på er grupp och vad ni vill göra.
                Vi kommer återkomma med en kostnad då denna beror mycket på det specifika bidraget.
              </p>

              <h2> Tidigare bidrag </h2>
              <p>
                Nedan följer exempel från bidrag till Kårtegen under SOF17.
                Skisser med tillhörande bild under själva Kårtegen och även en kortare beskrivning om vad ett bidrag kan handla om och hur det anknyter till temat.
                Dessa kan ni som ansöker om Kårtegebidrag använda som riktlinjer för vad vi i Kårtegeutskottet vill ha in från er.
              </p>
            </GridCell>
          </GridInner>
        </Grid>

        <HighlightedArea className='grid-gap-8 ' color='green'>
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            <h2> Skissexempel #1 </h2>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='8' className='h-center'>
            <Ripple>
              <div 
                className = 'cortege-image cortege-image-square-desktop'
                style={{backgroundImage: 'url(' + 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg' + ')'}}
              />
            </Ripple>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='4' className='h-center'>
            <GridInner style={{width: '100%'}} className='grid-gap-8'>
              <GridCell phone="4" tablet="4" desktop='12' className='h-center'>
                <Ripple>
                  <div 
                    className = 'cortege-image cortege-image-square-tablet'
                    style={{backgroundImage: 'url(' + 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg' + ')'}}
                  />
                </Ripple>
              </GridCell>
              <GridCell phone="4" tablet="4" desktop='12' className='h-center'>
                <Ripple>
                  <div 
                    className = 'cortege-image cortege-image-square-tablet'
                    style={{backgroundImage: 'url(' + 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg' + ')'}}
                  />
                </Ripple>
              </GridCell>
            </GridInner>
          </GridCell>
        </HighlightedArea>

        <Grid className="base-outer-grid ">
        </Grid>

        <HighlightedArea className='grid-gap-8'>
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            <h2> Skissexempel #2 </h2>
          </GridCell>
          <GridCell phone="4" tablet="4" desktop='6' className='h-center'>
            <Ripple>
              <div 
                className = 'cortege-image cortege-image-square-tablet'
                style={{backgroundImage: 'url(' + 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg' + ')'}}
              />
            </Ripple>
          </GridCell>
          <GridCell phone="4" tablet="4" desktop='6' className='h-center'>
            <Ripple>
              <div 
                className = 'cortege-image cortege-image-square-tablet'
                style={{backgroundImage: 'url(' + 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg' + ')'}}
              />
            </Ripple>
          </GridCell>
        </HighlightedArea>

        <Grid className="base-outer-grid ">
        </Grid>

        <HighlightedArea >
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            <h2> Exempel på fribygge </h2>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            <Ripple>
              <div 
                className = 'cortege-image'
                style={{backgroundImage: 'url(' + 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg' + ')'}}
              />
            </Ripple>
          </GridCell>
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2> Beskrivningsexempel </h2>
              <p>
                “Konkret kommer flaket att se ut som målgången för Vasaloppet i Mora. Det stora valvet kommer att byggas och ett fjällandskap med snö och granar kommer prägla flaket. En läktare kommer finnas för att skapa så lik bild av den riktiga målgången som möjligt. Tanken är att det snöar vid målgången för extra effekt för publiken. Själva flaket kommer ha upploppspår där några åkare är på väg in i mål. För att ligga i enlighet med temat så kommer vi ha åkare från de olika tiderna som loppet genomförts. Bygget kommer verkligen spegla en typisk svensk tradition. Publiken kommer bjudas på blåbärssoppa av dalkullor och åkare kommer ”åka” bakom flaket för att integrera med publiken.”
              </p> 

              <h2 style={{marginBottom: '0'}}> Kontakt </h2>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6'>
              <ContactCard
                name={contactDaniel.name} 
                title={contactDaniel.title} 
                email={contactDaniel.email} 
                image={contactDaniel.image}
                clickable
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6'>
              <ContactCard
                name={contactNils.name} 
                title={contactNils.title} 
                email={contactNils.email} 
                image={contactNils.image}
                clickable
              />
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default CortegeApplication;
