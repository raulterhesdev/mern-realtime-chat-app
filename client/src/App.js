import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Chat from './components/Chat/Chat';
import RoomSelect from './components/RoomSelect/RoomSelect';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={RoomSelect} />
      <Route path='/chat' component={Chat} />
    </Switch>
  );
}

export default App;
