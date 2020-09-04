import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import WelcomePage from './components/WelcomePage'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render( <BrowserRouter>
 <Switch>
    <Route path='/FileUpload' component={App} />
    <Route path='/' component={WelcomePage} />
  </Switch>
  </BrowserRouter>, document.querySelector('#root'));
