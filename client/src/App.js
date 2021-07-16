import './App.css';
import Home from './components/Home';

import React from "react";
import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import { Contact } from './components/Contact';
import Protected from './components/Protected';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <div>
          
          <Switch> 
            <Route path="/Signin">
              <Signin />
            </Route>
            <Route path="/Signup">
              <Signup />
            </Route>
            <Route path="/Contact">
              <Protected Cmp={Contact} />
            </Route>
            <Route exact path='/'>
              <Protected Cmp={Home} />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;