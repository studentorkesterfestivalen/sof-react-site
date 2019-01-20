import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import { addLocaleData } from 'react-intl'
import './stylesheets/main.scss';
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';


addLocaleData([...en, ...sv]);

render(<BrowserRouter>
          <CookiesProvider>
            <App/>
          </CookiesProvider>
        </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
