import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Hotels from './components/hotel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="bg-beach-background h-screen w-screen bg-no-repeat bg-cover">
    {/* <h1 className="text-center text-green-700">bruh</h1> */}
    <h1 className="text-center text-white bold px-3">Travel Pal</h1>
    <App/>
  </div>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
