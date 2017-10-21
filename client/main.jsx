import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import '../node_modules/cardinalcss/cardinal.css'
 
import Ballot from '../imports/ui/Ballot.jsx'
 
Meteor.startup(() => {
  render(
  <div className="wrapper">
    <Ballot />
  </div>  , document.getElementById('render-target'))
})
