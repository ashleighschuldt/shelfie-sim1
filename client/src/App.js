import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home';
import {Switch, Route} from 'react-router-dom';

import Bins from './Components/Bins';
import Bin from './Components/Bin';
import Add from './Components/Add';


class App extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/bins/:letter' component={Bins}/>
            <Route path='/bin/:letter:Num' component={Bin}/>
            <Route path='/create/:letter:Num' component={Add}/>
                                     
          </Switch>  
            
      </div>
    );
  }
}

export default App;
