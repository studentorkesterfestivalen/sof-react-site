import about from './About';
import countdown from './SofCountdown';
import history from './History';
import contact from './Contact';
import cortegeAbout from './CortegeAbout';
import cortegeAppl from './CortegeAppl';

export default {
    'sv': {...about.sv, ...countdown.sv, ...history.sv, ...contact.sv, ...cortegeAbout.sv, ...cortegeAppl.sv},
    'en': {...about.en, ...countdown.en, ...history.en, ...contact.en, ...cortegeAbout.en, ...cortegeAppl.en}
};
