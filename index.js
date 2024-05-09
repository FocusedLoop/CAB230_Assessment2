import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import VolcanoByID from './components/VolcanoDetails';
import HomePage from './containers/HomePage';
import UserLogin from './containers/LoginPage';
import UserRegistration from './containers/RegisterPage';
import ListedVolcanoes from './containers/VolcanoList';

// Creates url path for different pages and assignes them to defined functions that load pages
// All main site pages are contained within containers
// root.render - Produces a root instance root react element and then renders it
// StrictMode - Indentifies issues when cyclign through the code
// BrowserRouter - Configures the web router to allow other pages to be rendered from the url
// App - Prdouces the layout and logic for the rest of the site
// Routes and Route - Specifies page a specific url path loads
// A footer is present at the bottom that is displayed across all pages
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
        <Route path="/volcano" element={<VolcanoByID />} />
      </Routes>
    </BrowserRouter>
    <div className='footer'>
      <p>&copy; 2024 Find My Volcano. All rights reserved.</p>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
