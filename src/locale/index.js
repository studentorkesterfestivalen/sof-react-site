import about from './About';
import countdown from './SofCountdown';
import history from './History';
import contact from './Contact';
import cortegeAbout from './CortegeAbout';
import cortegeAppl from './CortegeAppl';
import general from './General';
import footer from './Footer';
import login from './Login';
import register from './Register';

export default {
    'sv': {...about.sv, ...countdown.sv, ...history.sv, ...contact.sv, ...cortegeAbout.sv, ...cortegeAppl.sv, ...general.sv, ...footer.sv, ...login.sv, ...register.sv},
    'en': {...about.en, ...countdown.en, ...history.en, ...contact.en, ...cortegeAbout.en, ...cortegeAppl.en, ...general.en, ...footer.en, ...login.en, ...register.en}
};
