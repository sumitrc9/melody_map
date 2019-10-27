import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import RedirectPage from './pages/RedirectPage';
import AddSession from './pages/AddSession';
import SessionPage from './pages/SessionPage';

class App extends Component {
  render() {
    
    const App = () => (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/addsession' component={AddSession}/>
          <Route path='/map' component={MapPage}/>
          <Route path='/session' component={SessionPage}/>
          <Route redirect='/redirect' component={RedirectPage}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}
export default App;