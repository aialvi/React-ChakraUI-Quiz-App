import React from "react";
import { User } from "./components/user/User";
import { Admin } from "./components/admin/Admin";
import { NotFound } from "./components/misc/404";
import { Home } from "./components/home/Home";
import { Login } from "./components/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
