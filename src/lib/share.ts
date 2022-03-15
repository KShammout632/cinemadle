import { UAParser } from 'ua-parser-js'
import { MAX_CHALLENGES } from '../constants/settings'
import { GAME_TITLE } from '../constants/strings'
import { getGuessStatus } from './statuses'
import { solutionIndex } from './words'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  handleShareToClipboard: () => void
) => {
  const textToShare =
    `#${GAME_TITLE} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}\n\n🎥` +
    generateEmojiGrid(guesses, getEmojiTiles(isDarkMode)) +
    '\n\nhttps://cinemadle.com/'

  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  if (!shareSuccess) {
    navigator.clipboard.writeText(textToShare)
    handleShareToClipboard()
  }
}

export const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatus(guess)

      switch (status) {
        case 'correct':
          return tiles[0]
        case 'incorrect':
          return tiles[1]
        default:
          return tiles[2]
      }
    })
    .join('')
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  )
}

const getEmojiTiles = (isDarkMode: boolean) => {
  let tiles: string[] = []
  tiles.push('🟩')
  tiles.push('🟥')
  tiles.push(isDarkMode ? '⬛' : '⬜')
  return tiles
}
