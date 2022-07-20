import { ReactElement, useContext, useMemo, useState } from 'react'

import { CalendarContext } from '..'
import { Acquaintance } from '../acquaintances'
import { AttendeeSuggestions } from './attendee-suggestions'
import { suggestAttendesBasedOnTitle } from './attendee-suggestions/suggestions'
import { EventDetails } from './event-details'
import { EventTitle } from './event-title'
import { Pane } from './pane'

export function EventPane(): ReactElement {
  const { 
    acquaintances,
    attendees,
    addAttendee
  } = useContext(CalendarContext)

  const [ title, setTitle ] = useState('')
  const [ showSuggestions, setShowSuggestions ] = useState(false)

  const { suggestedAttendees, query } = useMemo(
    () => suggestAttendesBasedOnTitle(title, acquaintances, attendees),
    [ acquaintances, attendees, title ]
  )

  // When an Acquaintance is added to the event, the suggestions are hidden and the person
  // is added to the event as an Attendee.
  const inviteAquaintance = (acquaintance: Acquaintance): void => {
    setShowSuggestions(false)
    
    updateTitleToMatchAttendee(acquaintance)

    addAttendee(acquaintance)
  }

  // When we are adding an attendee, the title is updated to match the name of the attendee.
  // For Example: 'Ric' becomes 'Rick'.
  const updateTitleToMatchAttendee = (attendee: Acquaintance): void => {
    const words = title.split(' ')

    const newTitle = [ ...words.slice(0, -1), attendee.firstName ].join(' ')

    setTitle(newTitle)
  }

  const onSelectedAttendeeHandler = (attendee: Acquaintance): void => {
    inviteAquaintance(attendee)
  }

  const onSubmitHandler = (): void => {
    const [ attendee ] = suggestedAttendees

    if (!attendee) {
      return
    }

    inviteAquaintance(attendee)
  }
  
  const onTitleChangedHandler = (newTitle: string): void => {
    setTitle(newTitle)

    setShowSuggestions(true)
  }

  return (
    <Pane testId='event-pane'>
      
      <EventTitle
        title={ title }
        onSubmit={ onSubmitHandler }
        onTitleChange={ onTitleChangedHandler }
      />

      <div className='w-full relative'>

        <AttendeeSuggestions
          isVisible={ showSuggestions }
          suggestedAttendees={ suggestedAttendees }
          query={ query}
          onSelectedAttendee={ onSelectedAttendeeHandler }
        />

        <EventDetails
          attendees={ attendees }
        />

      </div>

    </Pane>     
  )
}