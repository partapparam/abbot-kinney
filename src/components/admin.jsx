import { Outlet, Link } from "react-router-dom"
import { Footer } from "./footer"
import React from "react"

const LINKS = [
  { link: "", title: "Submissions" },
  {
    link: `editor/letter/${import.meta.env.VITE_AIRTABLE_EDITOR_LETTER_ID}`,
    title: "Edit Letter",
  },
  {
    link: `editor/header/${import.meta.env.VITE_AIRTABLE_EDITOR_HEADER_ID}`,
    title: "Edit Header",
  },
]

const Admin = () => {
  return (
    <div className="mt-5 h-screen flex flex-col">
      <p className="text-4xl font-extrabold p-3 sm:p-5">Admin</p>
      <div className="nav bg-gray-800 text-white px-4 py-2 flex flex-row shadow-sm">
        {LINKS.map((link) => {
          return (
            <button className=" px-4" key={link.title}>
              <Link to={link.link}>{link.title}</Link>
            </button>
          )
        })}
      </div>
      <div className="p-3 sm:p-5 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Admin
