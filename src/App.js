import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ActionsList from "./components/ActionsList";
import EditAction from "./components/EditAction";
import CreateAction from "./components/CreateAction";
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
            <Route path="/" exact element={<ActionsList />} />
            <Route path="/edit/:id" element={<EditAction />} />
            <Route path="/create" element={<CreateAction />} />
            <Route path="/user" element={<CreateUser />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
