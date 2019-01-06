import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import {BrowserView,
        MobileView,
        isBrowser,
        isMobile } from 'react-device-detect';
import posed from 'react-pose';

const Container = posed.div({
  enter: { staggerChildren: 50}
});

const P = posed.p({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});


const About = () => {
  return (
    <Container>
      <P>
        <h1>  Om SOF </h1>
      </P>
      <P>
        9-11 maj 2019 är det återigen dags för Studentorkesterfestivalen!
        SOF är ett tredagarsevenemang som arrangeras av LinTek och hålls varannat
        år i Linköping för både studenter och icke-studenter.
        Dessa tre fullspäckade SOF-dagar är fyllda av underhållning i form av en kårtege,
        ett festivalområde och orkesterspelningar.
       </P>
    </Container>
  )
}

export default About;
