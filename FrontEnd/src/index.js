import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client in React 18
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/auth';
import {UserProvider} from "./context/post"
import {ProductProvider} from "./context/postProduct"
// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <UserProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
