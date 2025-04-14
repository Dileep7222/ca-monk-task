import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './components/start';
import HomePage from './components/homepage';
import Questions from './components/Questions';
import ResultPage from "./components/ResultPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/result" element={<ResultPage />} />


      </Routes>
    </Router>
  );
}

export default App;
