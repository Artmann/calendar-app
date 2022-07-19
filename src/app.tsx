import React from 'react'
import { CalendarPage } from './pages/calendar-page'

function App() {
  return (
    <div
      className={`
        bg-grayscale-30
        text-gray-700
        w-full h-screen
      `}
    >
      {/* The Router would go here */}
      <CalendarPage />
    </div>
  )
}

export default App
