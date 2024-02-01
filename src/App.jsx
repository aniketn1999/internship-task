import React from 'react'
import ShowCard from './Components/ShowCard'
import { Routes, Route } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import SummaryPage from './Components/SummaryPage'
import MovieTicketBooking from './Components/MovieTicketBooking'

const App = () => {
  return (
    <>

      <div>
        <Routes>
          <Route path='/' element={<ShowCard />} />
          <Route path='/summarypage/:id' element={<SummaryPage />} />
          <Route path='/summarypage/:id/:name' element={<MovieTicketBooking />} />
        </Routes>
      </div>
    </>
  )
}

export default App
