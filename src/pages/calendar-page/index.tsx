import { createContext, ReactElement, useEffect, useState } from 'react'

import { Acquaintance, fetchAcquaintances } from './acquaintances'
import { Calendar } from './calendar'
import { EventPane } from './event-pane'

export type CalendarContextProps = {
  acquaintances: Acquaintance[]
  attendees: Acquaintance[]
  addAttendee: (attendee: Acquaintance) => void
}

export const CalendarContext = createContext<CalendarContextProps>({
  acquaintances: [],
  attendees: [],
  addAttendee: () => {}
})

export function CalendarPage(): ReactElement {
  const [ acquaintances, setAcquaintances ] = useState<Acquaintance[]>([])
  const [ attendees, setAttendees ] = useState<Acquaintance[]>([])
  const [ isLoading, setIsLoading ] = useState(true)  

  useEffect(function loadAcquaintances() {
    setIsLoading(true)

    fetchAcquaintances()
      .then(newAcquaintances => setAcquaintances(newAcquaintances))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }, [])

  const addAttendee = (attendee: Acquaintance): void => {
    setAttendees([ ...attendees, attendee ])
  }

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const calendarContext = {
    acquaintances,
    attendees,
    addAttendee
  }

  return (
    <CalendarContext.Provider value={ calendarContext }>
      <div className='flex h-full'>

        <Calendar />
        
        <EventPane />

      </div>
    </CalendarContext.Provider>
  )
}