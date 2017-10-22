import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data';
import { Contests } from '../api/contests.js'
import contestMap from '../util/contestMap.jsx'
 
class NewBallot extends Component {
  handleSubmit(event) {
    event.preventDefault()

    const ballot = ReactDOM.findDOMNode(this.refs.ballotInput).value.trim();
    const contestType = ReactDOM.findDOMNode(this.refs.contestTypeInput).value.trim();
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const type = ReactDOM.findDOMNode(this.refs.typeInput).value.trim();
    const instructions = ReactDOM.findDOMNode(this.refs.instructionsInput).value.trim();
    const choicesString = ReactDOM.findDOMNode(this.refs.choicesInput).value.trim();
    if (!choicesString) { return; }
    let choices = choicesString.split(',');
    choices = choices.map((choice) => {
      return choice.trim()
    })

    Contests.insert({
      ballot,  
      description: {
        title,
        type,
        instructions,
      },
      choices,
      contestType,
      owner: Meteor.userId(),
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

  render() {
    return (
      <div>
        <h1>Create a new ballot</h1>
          <input
            type="text"
            ref="ballotInput"
            placeholder="Enter Ballot ID"
          /><br />
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
}

NewBallot.propTypes = {
  currentUser: PropTypes.object,
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  }
})(NewBallot)
