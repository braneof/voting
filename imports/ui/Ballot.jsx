import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data';
import { Contests } from '../api/contests.js'
import { SubmittedVotes } from '../api/submittedVotes.js'
 
import Contest from './Contest.jsx'
 
class Ballot extends Component {
  constructor(props) {
    super(props)
    const ballotSubmitted = props.submittedVotes.length > 0
    let votes
    if (ballotSubmitted) {
      votes = props.submittedVotes.reduce((obj, vote) => {
        obj[vote.contestID] = vote.voteData
        return obj
      }, {})
    }
    else {
      votes = {}
    }
    this.state = { 
      submitted: ballotSubmitted,
      votes,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(contestID, voteData) {
    this.setState({ votes: { 
      ...this.state.votes, [contestID]: voteData
    }
    })
  }

  renderContests() {
    return this.props.contests.map((contest) => (
      <Contest key={contest._id} contest={contest} votes={this.state.votes[contest._id] || {} } onChange={this.handleChange} />
    ))
  }
 
  handleSubmit() {
    for (const [contestID, voteData] of Object.entries(this.state.votes)) {
      SubmittedVotes.insert({
        contestID,
        voteData,
        owner: Meteor.userId(),
        createdAt: new Date(), // current time
      })
    }
    this.setState({ submitted: true })
  }
  render() {
    let submitButton = ""
    if (!this.state.submitted) {
      submitButton = <input type="submit" value="Submit" onClick={this.handleSubmit} />
    }
    return (
      <div className="container">
        <header>
          <h1>Votem Ballot</h1>
        </header>
 
        {this.renderContests()}
        {submitButton}

      </div>
    )
  }
}

Ballot.propTypes = {
  contests: PropTypes.array.isRequired,
  submittedVotes: PropTypes.array,
  currentUser: PropTypes.object,
}
 
export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    contests: Contests.find({ballot: 'Bob'}).fetch(),
    submittedVotes: SubmittedVotes.find({ owner: Meteor.userId() }).fetch(),
  };
})(Ballot)
