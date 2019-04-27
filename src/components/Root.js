import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import { Snackbar, SnackbarAction } from '@rmwc/snackbar';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
    <Snackbar
      open={true}
      onClose={() => this.props.closeSnackbar()}
      message={'this.props.dialog.snackbarMsg'}
      action={
        <SnackbarAction
          label="OK"
          onClick={() => console.log('Click Me')}
        />
      }
    />

  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;