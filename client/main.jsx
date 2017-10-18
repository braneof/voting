import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
 
import Ballot from '../imports/ui/Ballot.jsx'
 
Meteor.startup(() => {
  render(<Ballot />, document.getElementById('render-target'))
})
