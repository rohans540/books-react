import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home/Home";
import BookDetails from '@pages/BookDetails/BookDetails';



const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/books" element={<Home />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  )
}

export default App