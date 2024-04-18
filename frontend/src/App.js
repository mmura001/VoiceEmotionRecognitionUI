//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Components/Main/MainPage';
import Home from './Components/Home/Home';


// function App() {
//   return (
//     <div class="App">
//       <img src="public/Bg1.jpg" alt="University Logo" class="university-logo"></img>
//       <h1>Welcome to CS732</h1>
//       <br/>
//       <div class="section-title">Human Computer Interaction</div>
//       <div class="section-title1">Our Project: Voice Emotion Detection</div>
//       <br/>
//       <div class="button-container">
//         <a href="#" class="button">Get Started</a>
//       </div>
//     </div>
//   );
// }

const App = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/mainpage" element={<MainPage />} />
    </Routes>
  </Router>
);

export default App;
