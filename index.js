import React from 'react';
import { browserRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import VolcaneoByID from './components/VolcanoDetails';
import HomePage from './containers/HomePage';
import UserLogin from './containers/LoginPage';
import UserRegistration from './containers/RegisterPage';
import ListedVolcanoes from './containers/VolcanoList';


// Fix spelling error
// Creates url path for different pages
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/volcanoes" element={<ListedVolcanoes />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/volcaneo" element={<VolcaneoByID />} />
      </Routes>
    </BrowserRouter>
    <div className='footer'>
      <p>&copy; 2024 MyApp. All rights reserved.</p>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
