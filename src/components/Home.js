import React from 'react';
import posed from 'react-pose';
import { FormattedMessage } from 'react-intl'


const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const P = posed.p({
  enter: { y: 0, opacity: 1 },
  exit: { y: -50, opacity: 0 }
});


const Home = () => {
  return (
    <Container>
      <P>
        <h1> 
          <FormattedMessage
            id="Home.welcomeMessage"
            defaultMessage="Välkommen till Studentorkesterfestivalens"
          />
          <br/>
           <FormattedMessage
            id="Home.wlcm2"
            defaultMessage="nya hemsida!"
          />      
        </h1>
      </P>
      <P>
        <h1>      Festival </h1>
      </P>
      <P>
        <FormattedMessage
            id="Home.festivalInfo"
            defaultMessage="Festivalen besöks under SOF av tiotusentals studenter och består av ett
            område fyllt av skojiga aktiviteter, feta orkesterspelningar,
            servering av mat och dryck samt tre hejdundrande fester!"
        />
      </P>
      <P>
        <h1>      Kårtege </h1>
      </P>
      <P>
        <FormattedMessage 
            id="Home.kartegeInfo"
            defaultMessage="Kårtegen som rullar genom Linköping den 11 maj har upp emot 50 000 åskådare och
            består av ekipage byggda av Linköpings påhittiga studenter."
        />
      </P>
      <P>
        <h1> Orkester </h1>
      </P>
      <P>
        <FormattedMessage
            id="Home.orchestraInfo"
            defaultMessage="SOF får besök av hundratals orkestermedlemmar från hela vårt avlånga land,
            resterande länder i norden och delar av norra Europa.
            Orkestrarna spelar under hela SOF-helgen både på festivalområdet och nere på stan!"
        />
      </P>
    </Container>
  )
}

export default Home;
