import React, { Component } from 'react'
 
import Contest from './Contest.jsx'
 
// App component - represents the whole app
export default class Ballot extends Component {
  getContests() {
    return [
      { _id: 1, text: 'Vote yes or no', choices: ['YES', 'NO'] },
      { _id: 2, text: 'Vote up or down', choices: ['up', 'down'] },
      { _id: 3, text: 'Vote Bob or Jim', choices: ['Bob', 'Jim'] },
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
