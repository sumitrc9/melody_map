import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import AddSession from './pages/AddSession';

class App extends Component {
  render() {
    const App = () => (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/addsession' component={AddSession}/>
          <Route path='/map' component={MapPage}/>
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