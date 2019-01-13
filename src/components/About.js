import React from 'react';
import posed from 'react-pose';
import { FormattedMessage } from 'react-intl';

const Container = posed.div({
  enter: { staggerChildren: 50}
});

const P = posed.p({
  enter: { y:  0, opacity: 1 },
  exit: {  y:-50, opacity: 0 }
});


const About = () => {
  return (
    <Container>
      <P>
        <h1>  
          <FormattedMessage 
            id="About.header"
            default="Om SOF"
          />
        </h1>
      </P>
      <P>
        <FormattedMessage
          id="About.aboutText"
          default="9-11 maj 2019 är det återigen dags för Studentorkesterfestivalen!
          SOF är ett tredagarsevenemang som arrangeras av LinTek och hålls varannat
          år i Linköping för både studenter och icke-studenter.
          Dessa tre fullspäckade SOF-dagar är fyllda av underhållning i form av en kårtege,
          ett festivalområde och orkesterspelningar."
        />
       </P>
    </Container>
  )
}

export default About;
