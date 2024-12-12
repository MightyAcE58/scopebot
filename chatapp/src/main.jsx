import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App.jsx';
import NavBar from './components/NavBar.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ChatuiApp from './pages/ChatuiApp.jsx';

// Create the root of the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* NavBar should be visible on all pages */}
      <NavBar />

      {/* Define Routes for different components */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/ChatBot' element={<ChatuiApp/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);