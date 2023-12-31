import "./App.css";
import Navbar from "./component/Navbar";
import BuildNetwork from "./pages/BuildNetwork";
import BuildResume from "./pages/BuildResume";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import LearningResources from "./pages/LearningResources";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./component/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("https://eapply-backend.vercel.app/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          throw new Error("Authentication failed");
        })
        .then((resObj) => {
          setUser(resObj.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  console.log(user);

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/resources" element={<LearningResources />} />
          <Route path="/resume" element={<BuildResume />} />
          <Route path="/network" element={<BuildNetwork />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
