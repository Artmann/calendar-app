import { ReactElement, useState } from 'react'

import { Acquaintance } from '../acquaintances'
import { AttendeeSuggestions } from './attendee-suggestions'
import { EventDetails } from './event-details'
import { EventTitle } from './event-title'
import { Pane } from './pane'

type EventPaneProps = {
  acquaintances: Acquaintance[]
  attendees: Acquaintance[]
}

export function EventPane({ acquaintances, attendees }: EventPaneProps): ReactElement {
  const [ title, setTitle ] = useState('')
  
  const suggestedAttendees = [ ...acquaintances ]

  return (
    <Pane testId='event-pane'>
      
      <EventTitle
        title={ title }
        onTitleChange={ newTitle => setTitle(newTitle) }
      />

      <div className='w-full relative'>

        <AttendeeSuggestions
          suggestedAttendees={ suggestedAttendees }
        />

        <EventDetails
          attendees={ attendees }
        />

      </div>

    </Pane>     
  )
}