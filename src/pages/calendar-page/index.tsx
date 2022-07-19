import { ReactElement, useEffect, useState } from 'react'

import { Acquaintance, fetchAcquaintances } from './acquaintances'
import { Calendar } from './calendar'
import { EventPane } from './event-pane'

export function CalendarPage(): ReactElement {
  const [ acquaintances, setAcquaintances ] = useState<Acquaintance[]>([])
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    fetchAcquaintances()
      .then(newAcquaintances => setAcquaintances(newAcquaintances))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className='flex h-full'>
      <Calendar />
      <EventPane 
        acquaintances={ acquaintances }
        attendees={ acquaintances }
      />
    </div>
  )
}