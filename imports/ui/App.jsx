import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data';
import Ballot from './Ballot.jsx'
import { Contests } from '../api/contests.js'
import contestMap from '../util/contestMap.jsx'
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
class App extends Component {
  handleSubmit(event) {
    event.preventDefault()

    const contestType = ReactDOM.findDOMNode(this.refs.contestTypeInput).value.trim();
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const type = ReactDOM.findDOMNode(this.refs.typeInput).value.trim();
    const instructions = ReactDOM.findDOMNode(this.refs.instructionsInput).value.trim();
    const choicesString = ReactDOM.findDOMNode(this.refs.choicesInput).value.trim();
    let choices = choicesString.split(',');
    choices = choices.map((choice) => {
      return choice.trim()
    })

    Contests.insert({
      description: {
        title,
        type,
        instructions,
      },
      choices,
      contestType,
      createdAt: new Date(), // current time
    });

    ReactDOM.findDOMNode(this.refs.titleInput).value = '';
    ReactDOM.findDOMNode(this.refs.typeInput).value = '';
    ReactDOM.findDOMNode(this.refs.instructionsInput).value = '';
    ReactDOM.findDOMNode(this.refs.choicesInput).value = '';
  }

  renderContestTypeOptions() {
    return Object.keys(contestMap).map((contestType) => (
      <option key={contestType} value={contestType}>{contestType}</option>
    ))
  }

  componentToRender() {
    let component
    if (this.props.currentUser) {
      if (this.props.currentUser.emails[0].address === "admin@example.com") {
        component = (
        <div>
          <h1>Create a new ballot</h1>
          <h2>Add a contest</h2>
          <form className="newBallot" onSubmit={this.handleSubmit.bind(this)} >
            <select ref="contestTypeInput">
              {this.renderContestTypeOptions()}
            </select><br />
            <textarea
              ref="titleInput"
              placeholder="Contest title"
            /><br />
            <textarea
              ref="typeInput"
              placeholder="Describe the type of contest (e.g. Ranked Choice Voting, Vote for two)"
            /><br />
            <textarea
              ref="instructionsInput"
              placeholder="Instructions"
            /><br />
            <textarea
              ref="choicesInput"
              placeholder="Enter candidates or voting options, separated by commas"
            /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
        )
      }
      else {
        component = <Ballot />
      }
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
