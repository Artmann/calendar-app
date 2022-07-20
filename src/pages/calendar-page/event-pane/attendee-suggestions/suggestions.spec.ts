import { acquaintances } from '../../acquaintances'
import { suggestAttendesBasedOnTitle } from './suggestions'

describe('suggestions', () => {
  
  describe('suggestAttendesBasedOnTitle', () => {
    
    it('does not return any suggestions for an empty title.', () => {
      const suggestions = suggestAttendesBasedOnTitle('', acquaintances)
      
      expect(suggestions).toEqual([])
    })

    it('returns acquaintances where the title matches a first name.', () => {
      const suggestions = suggestAttendesBasedOnTitle('Em', acquaintances)

      expect(suggestions.map(s => s.name)).toEqual([
        'Emiel Janson',
        'Emily Gevalli',
        'Emielio Castillo'
      ])
    })

    it('returns acquaintances where the last word matches a first name.', () => {
      const suggestions = suggestAttendesBasedOnTitle(
        'Emiel / Ric',
        acquaintances
      )

      expect(suggestions.map(s => s.name)).toEqual([
        'Rick Pastoor',
        'Ricciardo Something'
      ])
    })

    it('returns acquaintances where the title matches a last name.', () => {
      const suggestions = suggestAttendesBasedOnTitle('Gev', acquaintances)

      expect(suggestions.map(s => s.name)).toEqual([
        'Emily Gevalli'
      ])
    })

    it('does not return acquaintances that are already attendees.', () => {
      const suggestions = suggestAttendesBasedOnTitle(
        'Em',
        acquaintances,
        [ acquaintances[0] ]
      )

      expect(suggestions.map(s => s.name)).toEqual([
        'Emily Gevalli',
        'Emielio Castillo'
      ])
    })

    it('does not return any suggestions when the title ends with a space.', () => {
      const suggestions = suggestAttendesBasedOnTitle(
        'Em ',
        acquaintances
      )

      expect(suggestions.map(s => s.name)).toEqual([])
    }) 

  })
})