import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import RedirectPage from './pages/RedirectPage';
import AddSession from './pages/AddSession';
import SessionPage from './pages/SessionPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class App extends Component {
  render() {

    const theme = createMuiTheme({
      palette: {
        secondary: {
            main: '#E33E7F'
        },
        primary: {
          main: "#ff397f"
        },
        text: {
          main:"#ffffff"
        }
      },
    })
    
    const App = () => (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/addsession' component={AddSession}/>
            <Route path='/map' component={MapPage}/>
            <Route path='/session' component={SessionPage}/>
            <Route redirect='/redirect' component={RedirectPage}/>
          </Switch>
        </MuiThemeProvider>
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