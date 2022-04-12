import { FILMS } from '../constants/filmlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import dayjs from 'dayjs'

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
  // const epochMs = new Date(2022, 2, 12).valueOf()
  const startDate = dayjs(new Date(2022, 2, 12))
  const today = dayjs(new Date().setHours(0, 0, 0, 0))
  const index = today.diff(startDate, 'day')
  const midnightToday = new Date().setHours(0, 0, 0, 0)
  const msInDay = 86400000
  const nextDay = midnightToday + msInDay
  // const index = Math.floor((nextDay - epochMs) / msInDay)

  return {
    solution: localeAwareUpperCase(FILMS[index % FILMS.length]),
    solutionIndex: index,
    tomorrow: nextDay,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
