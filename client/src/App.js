import React from "react";
import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/AuthPage/AuthPage";
import Question from "./pages/Question/Question";
import Answer from "./pages/Answer/Answer";
import About from "./components/About/About";

function App() {
  return (
    <>
      {/* Header Component */}
      {/* <Header /> */}

      {/* Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/question/:id" element={<Question />} />
        <Route path="/answer/:id" element={<Answer />} />
      </Routes>

      {/* Footer Component */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
