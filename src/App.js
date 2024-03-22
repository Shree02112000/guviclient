import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
