import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Tasks from "./pages/Tasks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/tasks" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route
          path="*"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/tasks" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />{" "}
      </Routes>
    </BrowserRouter>
  );
}
