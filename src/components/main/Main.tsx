import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Bookmarks from '../../pages/bookmarks/Bookmarks';
import Home from '../../pages/home/Home';
import Seen from '../../pages/seen/Seen';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/seen" component={Seen}></Route>
    <Route exact path="/bookmarks" component={Bookmarks}></Route>
  </Switch> 
);

export default Main;