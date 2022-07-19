import { ReactElement } from 'react'

import { Avatar } from '../../../../components/avatar'
import { Acquaintance } from '../../acquaintances'

type AttendeeSuggestionsProps = {
  suggestedAttendees: Acquaintance[]
}

export function AttendeeSuggestions({ suggestedAttendees }: AttendeeSuggestionsProps): ReactElement {
  return (
    <div
      className={`
        bg-white
        absolute top-0
        rounded-lg
        shadow-lg	
        w-60 p-2
        z-10
      `}
    >
      {
        suggestedAttendees.map((attendee, index) =>
          <AttendeeSuggestion
            attendee={ attendee }
            isActive={ index === 0 }
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
}

function AttendeeSuggestion({ attendee, isActive }: AttendeeSuggestion): ReactElement {
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