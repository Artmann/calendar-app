import { render, screen } from '@testing-library/react'

import { EventPane } from '.'

describe('Event Pane', () => {

  it('renders the event pane', () => {
    render(
      <EventPane 
        acquaintances={ [] }
        attendees={ [] }
      />
    )

    expect(screen.getByTestId('event-pane')).toBeInTheDocument()

  })
})