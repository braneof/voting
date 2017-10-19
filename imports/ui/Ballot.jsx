import React, { Component } from 'react'
 
import Contest from './Contest.jsx'
 
// App component - represents the whole app
export default class Ballot extends Component {
  getContests() {
    return [
      { _id: 1, text: 'Rank your choices', 
      contestType: 'rankedChoice', choices: ['YES', 'NO'] },
      { _id: 2, text: 'Vote up or down',
      contestType: 'simpleMajority', choices: ['up', 'down'] },
      { _id: 3, text: 'Vote for two: Bob or Jim or write-in',
      contestType: 'pickTwo', choices: ['Bob', 'Jim', '_'] },
    ]
  }
 
  renderContests() {
    return this.getContests().map((contest) => (
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
