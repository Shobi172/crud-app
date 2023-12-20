import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route exact path="/register" element={<RegistrationForm />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
