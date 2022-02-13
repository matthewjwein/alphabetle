import { solution } from './words'

export const getDistances = (
  guesses: string[]
): { [key: string]: number } => {
  const charObj: { [key: string]: number } = {}

  guesses.forEach((word) => {
    word.split('').forEach((letter, i) => {
      const correctLetterPos = solution[i].charCodeAt(0) - 65
      const guessedLetterPos = letter.charCodeAt(0) - 65

      const delta = guessedLetterPos - correctLetterPos

      return (charObj[letter] = delta)
    })
  })

  return charObj
}

export const getGuessDistances = (guess: string): number[] => {
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const statuses: number[] = Array.from(Array(guess.length))

  splitGuess.forEach((letter, i) => {
    const correctLetterPos = splitSolution[i].charCodeAt(0) - 65
    const guessedLetterPos = letter.charCodeAt(0) - 65
    return statuses[i] = guessedLetterPos - correctLetterPos
  })

  return statuses
}
