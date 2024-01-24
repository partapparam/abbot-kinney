import { Routes, Route, useLocation } from "react-router-dom"
import React from "react"
import Home from "./components/home"
import Letter from "./components/letter"
import Admin from "./components/admin"
import "./App.css"
import { LetterProvider } from "./providers/letterContext"
import AdminTable from "./components/adminTable"
import AdminEditor from "./components/adminEditor"
import AdminLogin from "./components/adminLogin"

const App = () => {
  // location will provide us the current location of the app
  // helps to properly rerender the components as the url changes
  const location = useLocation()
  return (
    <LetterProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Letter />} />
        <Route path="/thank-you" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="editor/:type/:id" element={<AdminEditor />} />
          <Route index element={<AdminTable />} />
        </Route>
      </Routes>
    </LetterProvider>
  )
}

export default App
