import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from "./Login";
import Blotter from "./Blotter";

/*eslint no-restricted-globals: ["off", "location"]*/
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login location={location} />} />
          <Route path="/blotter" element={<Blotter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
