import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Entry from './components/Entry/Entry'
import Contacts from './components/Contacts/Contacts'
import './App.css'

export default function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/entry">
            <Entry />
          </Route>
          <Route path="/:id/contacts">
            <Contacts />
          </Route>
          <Route path="/">
            <Redirect to={{ pathname: '/entry' }} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
