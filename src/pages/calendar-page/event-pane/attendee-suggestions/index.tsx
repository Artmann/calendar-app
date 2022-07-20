import { ReactElement } from 'react'
import Highlighter from 'react-highlight-words'

import { Avatar } from '../../../../components/avatar'
import { Acquaintance } from '../../acquaintances'

type AttendeeSuggestionsProps = {
  isVisible: boolean
  suggestedAttendees: Acquaintance[],
  
  onSelectedAttendee: (attendee: Acquaintance) => void
  
  query?: string,
}

export function AttendeeSuggestions({
  isVisible,
  suggestedAttendees,
  onSelectedAttendee,
  query = ''
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
        w-60 p-1
        z-10
      `}
    >
      {
        suggestedAttendees.map((attendee, index) =>
          <AttendeeSuggestion
            attendee={ attendee }
            isActive={ index === 0 }
            onClick={ () => onSelectedAttendee(attendee) }
            query={ query }
            
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
  query: string

  onClick: () => void
}

function AttendeeSuggestion({ attendee, isActive, query, onClick }: AttendeeSuggestion): ReactElement {
  return (
    <div
      className={`
        ${ isActive ? 'bg-grayscale-50' : 'bg-white' }
        cursor-pointer
        flex items-center gap-2	
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

        <div
          className='text-sm text-black leading-4'
          data-testid='attendee-suggestion-name'
        >
          <Highlighter
            highlightClassName='text-primary'
            highlightStyle={{ backgroundColor: 'transparent' }}
            searchWords={ [ query ]}
            autoEscape={true}
            textToHighlight={ attendee.name }
          />
        </div>
        
        <div
          className='text-2xs text-grayscale-600 leading-3'
          data-testid='attendee-suggestion-email'
        >
          <Highlighter
            highlightClassName='text-primary'
            highlightStyle={{ backgroundColor: 'transparent' }}
            searchWords={ [ query ]}
            autoEscape={true}
            textToHighlight={ attendee.email }
          />
        </div>

      </div>

    </div>
  )
}