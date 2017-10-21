import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data';
import { Contests } from '../api/contests.js'
 
import Contest from './Contest.jsx'
 
class Ballot extends Component {
  renderContests() {
    return this.props.contests.map((contest) => (
      <Contest key={contest._id} contest={contest} />
    ))
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Votem Ballot</h1>
        </header>
 
        {this.renderContests()}
      </div>
    )
  }
}

Ballot.propTypes = {
  contests: PropTypes.array.isRequired,
};
 
export default withTracker(() => {
  return {
    contests: Contests.find({}).fetch(),
  };
}, Ballot);
