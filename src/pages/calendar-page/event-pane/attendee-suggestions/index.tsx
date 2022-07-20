import { ReactElement } from 'react'

import { Avatar } from '../../../../components/avatar'
import { Acquaintance } from '../../acquaintances'

type AttendeeSuggestionsProps = {
  isVisible: boolean
  suggestedAttendees: Acquaintance[]

  onSelectedAttendee: (attendee: Acquaintance) => void
}

export function AttendeeSuggestions({
  isVisible,
  suggestedAttendees,
  onSelectedAttendee
}: AttendeeSuggestionsProps): ReactElement | null {
  if (!isVisible) {
    return null
  }
  
  if (suggestedAttendees.length === 0) {
    return null
  }
  
  return (
    <div
      className={`
        bg-white
        absolute top-0
        rounded-lg
        elevation-400
        w-60 p-2
        z-10
      `}
    >
      {
        suggestedAttendees.map((attendee, index) =>
          <AttendeeSuggestion
            attendee={ attendee }
            isActive={ index === 0 }
            onClick={ () => onSelectedAttendee(attendee) }
            key={ attendee.id } 
          />
        ) 
      }
    </div>
  )
}

type AttendeeSuggestion = {
  attendee: Acquaintance
  isActive: boolean

  onClick: () => void
}

function AttendeeSuggestion({ attendee, isActive, onClick }: AttendeeSuggestion): ReactElement {
  return (
    <div
      className={`
        ${ isActive ? 'bg-grayscale-50' : 'bg-white' }
        cursor-pointer
        flex items-center
        rounded-md
        px-4 py-3
        w-full
      `}
      onClick={ onClick }
    >

      <Avatar
        alt={ attendee.name }
        data={ attendee.image }
      />

      <div className='font-medium'>

        <div className='text-sm text-black leading-4'>
          { attendee.name }
        </div>
        
        <div className='text-2xs text-grayscale-600 leading-3'>
          { attendee.email }
        </div>

      </div>

    </div>
  )
}