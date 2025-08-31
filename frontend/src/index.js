import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//const socket = new WebSocket('ws://localhost:3000/ws');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <AuthProvider>
       <App />
      </AuthProvider>
    

  </React.StrictMode>
);


reportWebVitals();
