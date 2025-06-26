import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ImageStoragePage from './pages/ImageStoragePage';
import GoogleSheetPage from './pages/GoogleSheetPage';
import GoogleDocPage from './pages/GoogleDocPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <ProtectedRoute path="/admin">
              <AdminPage />
            </ProtectedRoute>
            <Route path="/image-storage" component={ImageStoragePage} />
            <Route path="/google-sheet" component={GoogleSheetPage} />
            <Route path="/google-doc" component={GoogleDocPage} />
            <Route path="/search" component={SearchPage} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;