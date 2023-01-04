import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AlgosList from "./components/AlgosList";
import EditAlgo from "./components/EditAlgo";
import CreateAlgo from "./components/CreateAlgo";
import CreateUser from "./components/CreateUser";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <br />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<AlgosList />} />
            <Route path="/edit/:id" element={<EditAlgo />} />
            <Route path="/create" element={<CreateAlgo />} />
            <Route path="/user" element={<CreateUser />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
