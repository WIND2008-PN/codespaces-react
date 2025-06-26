import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Admin from './pages/Admin';
import ImageStoragePage from './pages/ImageStoragePage';
import GoogleSheetPage from './pages/GoogleSheetPage';
import GoogleDocPage from './pages/GoogleDocPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import AdminCustomizeFormPage from './Admin/AdminCustomizeFormPage';
import AdminWebhookSettingsPage from './Admin/AdminWebhookSettingsPage';
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
              <Admin />
            </ProtectedRoute>
            <Route path="/image-storage" component={ImageStoragePage} />
            <Route path="/google-sheet" component={GoogleSheetPage} />
            <Route path="/google-doc" component={GoogleDocPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/settings" component={SettingsPage} />
            <ProtectedRoute path="/admin/customize-form">
              <AdminCustomizeFormPage />
            </ProtectedRoute>
            <ProtectedRoute path="/admin/webhook-settings">
              <AdminWebhookSettingsPage />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;