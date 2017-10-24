import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import '../node_modules/cardinalcss/cardinal.css'
import '../imports/css/styles.css'
 
import App from '../imports/ui/App.jsx'
 
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'))
})
