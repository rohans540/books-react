import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home/Home";
import BookDetails from '@pages/BookDetails/BookDetails';



const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  )
}

export default App