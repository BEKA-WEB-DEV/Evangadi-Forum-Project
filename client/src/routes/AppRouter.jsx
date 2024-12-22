import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import AuthPage from "../pages/AuthPage/AuthPage";
import Answer from "../pages/Answer/Answer";
import AskQuestion from "../pages/Question/AskQuestion/AskQuestion";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("Evandadi-Forum-token-JUN2024");
  return token ? children : <Navigate to="/auth" />;
};

function AppRouter() {
  return (
    <>
      {/* Routing */}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/ask"
          element={
            <PrivateRoute>
              <AskQuestion />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/questions"
          element={
            <PrivateRoute>
              <Answer />
            </PrivateRoute>
          }
        /> */}

        <Route
          path="/questions/:questionid"
          element={
            <PrivateRoute>
              <Answer />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRouter;
