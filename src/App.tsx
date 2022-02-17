import React from "react";
import { User } from "./components/user/User";
import { Admin } from "./components/admin/Admin";
import { NotFound } from "./components/misc/404";
import { Home } from "./components/home/Home";
import { Login } from "./components/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { QuestionList } from "./components/user/QuestionList";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<QuestionList />} />
              <Route path="/user/question/:id" element={<User />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
