import React from 'react'
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';

import {Login, Signup, Home, Map} from './Container'
import {Navbar, Preloader} from './Component';
import {MapWithNav} from './WithNav';
import History from './History';

class Routers extends React.Component {
  render() {
    return (
        <Router history = {History}>
        <Switch>
          <Route exact path="/" component={Preloader} />
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/map" component={MapWithNav} />
          {/* <Route path="/home" component={Home}/> */}

          {/* <Route path="/topics" component={Topics}/> */}
        </Switch>
      </Router>
      
    )
  }
}
export default Routers;