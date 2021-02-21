import logo from './logo.svg'
import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from '../src/components/Login&Register/Login'
import Register from '../src/components/Login&Register/Register'
import PageNotFound from '../src/components/PageNotFound'
import Todo from '../src/components/Todo'

function App () {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/' exact component={Register} />
          <Route path='/todo' component={Todo} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
