import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ImageStoragePage from './pages/ImageStoragePage';
import GoogleSheetPage from './pages/GoogleSheetPage';
import GoogleDocPage from './pages/GoogleDocPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/image-storage" component={ImageStoragePage} />
          <Route path="/google-sheet" component={GoogleSheetPage} />
          <Route path="/google-doc" component={GoogleDocPage} />
          <Route path="/search" component={SearchPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;