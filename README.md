# StudentOrkesterFestivalen's front end website.
This is the new front-end developed by SOF19 for SOF, written in React.
The page is heavily influenced by [Material Design](https://material.io/design/) with focus on animations to both give clear intentions of the webpage, as well as giving it some visual flair.

## Frameworks
* React
* [Redux](https://redux.js.org) - State management used in conjunction with react to keep track of the state and information in the application
* [Redux Thunk](https://github.com/reduxjs/redux-thunkhttps://github.com/reduxjs/redux-thunk) - Redux middleware to handle asynchronous requests
* [Redux Token Auth](https://github.com/kylecorbelli/redux-token-auth) - Used for handling login with tokens
* [RMWC](https://rmwc.io/) - Material Design React components
* [SASS](https://sass-lang.com/) - More programmer friendly CSS.
* [Pose](https://popmotion.io/pose/) - Fluid and easy to create animations.
* [React-intl](https://www.npmjs.com/package/react-intl) - Language localization. 

## Src file structure
#### Redux/Api
* [/actions](src/actions) contains all Redux actions that are used in the application
* [/reducers](src/reducers) contains all Redux reducers that are used in the application
* [/api](src/api) contains the functions that calls the back-end API.

#### Page components
* [/pages](src/pages) contains the different pageTypes and pagelayouts with their respective page texts
* [/components](src/components) contains all smaller react components that are used within the different pages.
* [/locale](src/locale) contains all text strings for the web-page in English and Swedish.

#### Stylesheets
* [/stylesheets](src/stylesheets) contains all SASS stylesheets



