import { getGuessDistances } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'
import { VERY_CLOSE_DISTANCE, SOMEWHAT_CLOSE_DISTANCE } from '../constants/settings'

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean
) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6${
      isHardMode ? '*' : ''
    }\n\n` + generateEmojiGrid(guesses) + '\nhttps://alphabetle.herokuapp.com/\n'
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessDistances(guess)

      return guess
        .split('')
        .map((_, i) => {
          const absStatus = status[i] ? Math.abs(status[i]) : undefined
          console.log(i, absStatus)
          if (!absStatus) {
              return '🟩'
          } else if (absStatus > 0 && absStatus <= VERY_CLOSE_DISTANCE) {
              return '🟨'
          } else if (absStatus > VERY_CLOSE_DISTANCE && absStatus <= SOMEWHAT_CLOSE_DISTANCE) {
              return '🟥'
          } else {
              if (localStorage.getItem('theme') === 'dark') {
                return '⬛'
              }
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
