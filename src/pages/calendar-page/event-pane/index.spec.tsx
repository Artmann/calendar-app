import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { EventPane } from '.'
import { CalendarContext, CalendarContextProps } from '..'
import { Acquaintance, acquaintances } from '../acquaintances'

describe('Event Pane', () => {

  it('renders the event pane.', () => {
    render(<EventPane />)

    expect(screen.getByTestId('event-pane')).toBeInTheDocument()
  })

  it('suggests attendes based on the title.', async () => {
    const context: CalendarContextProps = {
      acquaintances,
      attendees: [],
      addAttendee: jest.fn()
    }

    render(
      <CalendarContext.Provider value={ context }>
        <EventPane />
      </CalendarContext.Provider>
    )

    await userEvent.type(
      screen.getByTestId('event-title'),
      'Ric'
    )

    expect(screen.getByText('Rick Pastoor')).toBeInTheDocument()
    expect(screen.getByText('Ricciardo Something')).toBeInTheDocument()
  })

  it('invites the suggested attendee when the form is submitted.', async () => {
    const attendees: Acquaintance[] = []

    const context: CalendarContextProps = {
      acquaintances,
      attendees,
      addAttendee: (attende) => attendees.push(attende)
    }

    render(
      <CalendarContext.Provider value={ context }>
        <EventPane />
      </CalendarContext.Provider>
    )

    await userEvent.type(
      screen.getByTestId('event-title'),
      'Ric{enter}'
    )

    expect(screen.getByTestId('attendee-row-name')).toHaveTextContent('Rick Pastoor')
  })

  it('invites the suggested attendee when clicked.', async () => {
    const attendees: Acquaintance[] = []

    const context: CalendarContextProps = {
      acquaintances,
      attendees,
      addAttendee: (attende) => attendees.push(attende)
    }

    render(
      <CalendarContext.Provider value={ context }>
        <EventPane />
      </CalendarContext.Provider>
    )

    await userEvent.type(
      screen.getByTestId('event-title'),
      'Ric'
    )

    await userEvent.click(
      screen.getByText('Ricciardo Something')
    )

    expect(screen.getByTestId('attendee-row-name')).toHaveTextContent('Ricciardo Something')
  })

  it('updates the title with the attendee\'s first name.', async () => {
    const attendees: Acquaintance[] = []

    const context: CalendarContextProps = {
      acquaintances,
      attendees,
      addAttendee: (attende) => attendees.push(attende)
    }

    render(
      <CalendarContext.Provider value={ context }>
        <EventPane />
      </CalendarContext.Provider>
    )

    await userEvent.type(
      screen.getByTestId('event-title'),
      'Ric{enter}'
    )

    expect(screen.getByTestId('event-title')).toHaveValue('Rick')
  })

    it('invites multiple people', async () => {
    const attendees: Acquaintance[] = []

    const context: CalendarContextProps = {
      acquaintances,
      attendees,
      addAttendee: (attende) => attendees.push(attende)
    }

    render(
      <CalendarContext.Provider value={ context }>
        <EventPane />
      </CalendarContext.Provider>
    )

    await userEvent.type(
      screen.getByTestId('event-title'),
      'Ric{enter} / Emi{enter}'
    )

    expect(screen.getByTestId('event-title')).toHaveValue('Rick / Emiel')

    const attendeeNames = screen.queryAllByTestId('attendee-row-name')

    expect(attendeeNames[0]).toHaveTextContent('Rick Pastoor')
    expect(attendeeNames[1]).toHaveTextContent('Emiel Janson')

  })

})