import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* This will give us a single entry point for the entire app */}
        {/* This specifies a wild card route that will match any URL and render the APP compoenet  */}
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
