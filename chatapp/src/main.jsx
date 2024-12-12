import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App.jsx';
import Teams from './components/teams.jsx';
import TecStack from './components/TechStack.jsx';
import Appgrid from './components/Appgrid.jsx';
import WorkCard from './components/WorkCard.jsx';
import NavBar from './components/NavBar.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ChatBot from './pages/ChatuiApp.jsx';
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
        <Route path="/appgrid" element={<Appgrid />} />
        <Route path="/workcard" element={<WorkCard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/tech-stack" element={<TecStack />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/chatbot' element={<ChatuiApp/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);




// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './pages/App.jsx'
// import Teams from './components/teams.jsx'
// import TecStack from './components/TechStack.jsx'
// import Appgrid from './components/Appgrid.jsx'
// import WorkCard from './components/WorkCard.jsx'
// import NavBar from './components/NavBar.jsx'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import "react-router-dom";
// import Login from './pages/Login';

// createRoot(document.getElementById('root')).render(
//     <BrowserRouter>
//     <NavBar/>
//     <App/>
//     <Teams/>
//     <TecStack/>
//     <Appgrid/>
//     <WorkCard/>
//     <Routes>
//     <Route path="/" element={<App />} />
//     <Route path="/login" element={<Login />} />
//     </Routes>
//     </BrowserRouter>
// )


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <NavBar/>
//     <App/>
//     <Teams/>
//     <TecStack/>
//     <Appgrid/>
//     <WorkCard/>
//   </StrictMode>
// )