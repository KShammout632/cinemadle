import { cleanWord, solution } from './words'

export type CharStatus = 'absent' | 'incorrect' | 'correct'

export const getGuessStatus = (guess: string): CharStatus => {
  if (guess === '') return 'absent'
  return cleanWord(guess) === cleanWord(solution) ? 'correct' : 'incorrect'
}
