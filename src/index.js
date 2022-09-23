import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className=' text-center'>
    <h1 className=' text-green-400'>Hello World</h1>
    <App />
  </div>
);

