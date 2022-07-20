import { Acquaintance } from '../../acquaintances'

/**
 * Returns a list of acquaintances that we assume that the user is interested in based on
 * the title of an event. For example, if the title is "Emiel / Ric", we assume that the
 * user want's to create a meetijng with Emiel and Rick.
 * 
 * The suggestion will be based on both the first name and the last name of the
 * acquaintance as we refer to different people in different ways.
 */
export function suggestAttendesBasedOnTitle(
  title: string,
  acquaintances: Acquaintance[] = [],
  attendees: Acquaintance[] = []
): Acquaintance[] {
  if (title.length < 2) {
    return []
  }
  
  const words = title.split(/\s/)

  const [ lastWord, ] = words.reverse()

  if (lastWord.length === 0) {
    return []
  }

  const attendeeIds = attendees.map(attendee => attendee.id)

  return acquaintances
    .filter(acquaintance => matches(acquaintance, lastWord))
    .filter(acquaintance => !attendeeIds.includes(acquaintance.id))
}

function matches(acquaintance: Acquaintance, query: string): boolean {
  if (acquaintance.firstName.toLowerCase().startsWith(query.toLowerCase())) {
    return true
  }

  if (acquaintance.lastName.toLowerCase().startsWith(query.toLowerCase())) {
    return true
  }

  return false
}