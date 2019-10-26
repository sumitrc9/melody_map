import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import MapPage from './pages/MapPage';
import Redirect from './pages/Redirect'

class App extends Component {
  render() {
    const App = () => (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/map' component={MapPage}/>
          <Route redirect='/redirect' component={Redirect}/>
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