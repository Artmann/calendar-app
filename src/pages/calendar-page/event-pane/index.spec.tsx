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

    const suggestedAttendeeNames = screen.getAllByTestId('attendee-suggestion-name')

    expect(suggestedAttendeeNames[0]).toHaveTextContent('Rick Pastoor')
    expect(suggestedAttendeeNames[1]).toHaveTextContent('Ricciardo Something')
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

    const suggestedAttendeeNames = screen.getAllByTestId('attendee-suggestion-name')

    await userEvent.click(suggestedAttendeeNames[1])

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

  it('highligts the part of the name and email that matches the title', async () => {
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

    // NOTE: Using a query selector to find the highlighted element is
    // fragile, but will work for now.

    const suggestedAttendeeNames = screen.getAllByTestId('attendee-suggestion-name')

    expect(suggestedAttendeeNames[0]).toHaveTextContent('Rick Pastoor')
    expect(suggestedAttendeeNames[1]).toHaveTextContent('Ricciardo Something')

    expect(suggestedAttendeeNames[0].querySelector('mark')).toHaveClass('text-primary')
    expect(suggestedAttendeeNames[1].querySelector('mark')).toHaveClass('text-primary')

    const suggestedAttendeeEmails = screen.getAllByTestId('attendee-suggestion-email')

    expect(suggestedAttendeeEmails[0]).toHaveTextContent('rick@risecalendar.com')
    expect(suggestedAttendeeEmails[1]).toHaveTextContent('ricciardo@gmail.com')

    expect(suggestedAttendeeEmails[0].querySelector('mark')).toHaveClass('text-primary')
    expect(suggestedAttendeeEmails[1].querySelector('mark')).toHaveClass('text-primary')
  })

})