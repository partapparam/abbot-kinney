import { BrowserRouter, Routes, Route } from "react-router-dom"
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
  return (
    <LetterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Letter />} />
          <Route path="/thank-you" element={<Home />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="editor/:type/:id" element={<AdminEditor />} />
            <Route index element={<AdminTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LetterProvider>
  )
}

export default App
