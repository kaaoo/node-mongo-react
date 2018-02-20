import React, { Component } from 'react';
import './App.css';
import NavBar from './components/nav-bar';


import { Route } from 'react-router-dom';
import BotPage from './containers/bot-page';
import BotFormPage from './containers/bot-form-page';

class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/bots" component={BotPage} />
        <Route path="/bot/create" component={BotFormPage} />
        <Route path="/bots/:_id" component={BotFormPage} />
      </div>
    );
  }
}

export default App;
