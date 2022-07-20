import { ReactElement } from 'react'
import { Avatar } from '../../../../components/avatar'

import { Acquaintance } from '../../acquaintances'

type EventDetailsProps = {
  attendees: Acquaintance[]
}

export function EventDetails({ attendees }: EventDetailsProps): ReactElement {
  return (
    <div className='flex w-full'>
      
      <div
        className={`
          text-grayscale-600 
          font-medium text-sm leading-4
          pr-8
        `}
      >
        Attendees
      </div>

      <div className='w-full'>
        { attendees.map(attendee => <AttendeeRow attendee={ attendee } key={ attendee.id } />) }
      </div>

    </div>
  )
}

type AttendeeRowProps = {
  attendee: Acquaintance
}

function AttendeeRow({ attendee }: AttendeeRowProps): ReactElement {
  return (
    <div
      className='flex mb-2 items-center gap-2'
      data-testid='attendee-row'
    >
      
      <Avatar
        alt={ attendee.name }
        data={ attendee.image }
      />

      <div className='text-sm text-black font-medium leading-4'>
        <div data-testid='attendee-row-name'>
          { attendee.name }
        </div>
        <div className='text-grayscale-600 text-2xs flex items-center gap-0.5	leading-3'>
          
          <svg
            className=''
            width="12"
            height="12"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="6"
              cy="6.5"
              r="4.5"
              stroke="#19BE2F"
            />
            <path
              d="M4 7L5.5 8.5L8 5"
              stroke="#19BE2F"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          <div>
            Available
          </div>

        </div>
      </div>

    </div>
  )
}