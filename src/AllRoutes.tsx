import { User } from "./components/user/User";
import { Admin } from "./components/admin/Admin";
import { NotFound } from "./components/misc/404";
import { Home } from "./components/home/Home";
import { Login } from "./components/auth/Login";
import { QuestionList } from "./components/user/QuestionList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { SignUp } from "./components/auth/SignUp";
import NavBar from "./components/misc/Navbar";
import { AnswerList } from "./components/admin/question/Answers";

function AllRoutes() {
  return (
    <Router>
      <NavBar />
      <div className="Container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<QuestionList />} />
          <Route path="/user/question/:id" element={<User />} />
          <Route path="/admin/questions/:id/answers" element={<AnswerList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AllRoutes;
