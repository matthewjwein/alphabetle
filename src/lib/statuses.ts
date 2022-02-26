import { solution } from './words'
import { VERY_CLOSE_DISTANCE, SOMEWHAT_CLOSE_DISTANCE } from '../constants/settings'

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

const getPossibleGuessesForLetter = (letter: string, status: number): string[] => {
    if (status == 0) {
      return [letter]
    }

    const absStatus = Math.abs(status)

    const somewhatClose = absStatus != undefined && (absStatus > VERY_CLOSE_DISTANCE && absStatus <= SOMEWHAT_CLOSE_DISTANCE)
    const veryClose = absStatus != undefined && (absStatus > 0 && absStatus <= VERY_CLOSE_DISTANCE)
    const notClose = !somewhatClose && !veryClose && status != 0
   
    const currentLetterIndex = letter.charCodeAt(0) - 65

    if (notClose) {
      let letters = []

      for (var i = 0; i < 26; i++) {
        if (Math.abs(currentLetterIndex - i) > SOMEWHAT_CLOSE_DISTANCE) {
          let letter = String.fromCharCode(i + 65)
          letters.push(letter)
        }
      }

      return letters
    }

    let distance = absStatus   
    if (somewhatClose) {
      distance = SOMEWHAT_CLOSE_DISTANCE
    } else if (veryClose) {
      distance = VERY_CLOSE_DISTANCE
    }

    let letters = []
    for (var i = -distance; i <= distance; i++) {
      let letterIndex = currentLetterIndex + i
      if (letterIndex >= 0 && letterIndex < 26 && (veryClose || Math.abs(i) > VERY_CLOSE_DISTANCE)) {
        let letter = String.fromCharCode(letterIndex + 65)
        if (i != 0) {
          letters.push(letter)
        }
      }
    }
    return letters
}

const getUnion = (a: string[], b: string[]): string[] => {
  let result: string[] = []

  for (var i = 0; i < a.length; i++) {
    if (b.includes(a[i])) {
      result.push(a[i])
    }
  }

  return result
}

export const getPossibleLetters = (guesses: string[], position: number): string[] => {
  let result: string[] = []
  guesses.forEach((guess) => {
    const statuses = getGuessDistances(guess)
    const letter = guess[position]
    const status = statuses[position]
    const possibleGuesses = getPossibleGuessesForLetter(letter, status)
    if (result.length == 0) {
      result = possibleGuesses
    } else {
      result = getUnion(result, possibleGuesses)
    }
  })

  return result
}



