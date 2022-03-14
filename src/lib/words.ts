import { FILMS } from '../constants/filmlist'
import { VALID_GUESSES } from '../constants/validGuesses'

export const isWordInWordList = (word: string) => {
  return (
    FILMS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const cleanWord = (word: string) => {
  return word
    .toLowerCase()
    .replaceAll(/[^a-zA-Z\d ]/g, '')
    .replaceAll(' ', '_')
}

export const isWinningWord = (word: string) => {
  return cleanWord(solution) === cleanWord(word)
}

export const getCleanedSolution = () => {
  return cleanWord(solution)
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date(2022, 2, 12).valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: localeAwareUpperCase(FILMS[index % FILMS.length]),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
