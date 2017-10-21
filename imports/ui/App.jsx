import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data';
import Ballot from './Ballot.jsx'
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
class App extends Component {
  componentToRender() {
    let component
    if (this.props.currentUser) {
      component = <Ballot />
    }
    else {
      component = <div></div>
    }
    return component
  }

  render() {
    return (
      <div className="container wrapper">
        <header>
          <h1>Voting App</h1>
          <AccountsUIWrapper />
        </header>
        <div className="wrapper">
          {this.componentToRender()}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  }
})(App)
