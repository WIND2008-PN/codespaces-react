import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ImageStoragePage from './pages/ImageStoragePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/image-storage" component={ImageStoragePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;