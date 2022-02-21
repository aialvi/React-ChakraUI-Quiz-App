import { User } from "./components/user/User";
import { Admin } from "./components/admin/Admin";
import { NotFound } from "./components/misc/404";
import { Home } from "./components/home/Home";
import { Login } from "./components/auth/Login";
import { QuestionList } from "./components/user/QuestionList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function AllRoutes() {
  return (
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
  );
}

export default AllRoutes;
