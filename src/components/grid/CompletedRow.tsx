import { getGuessDistances } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  guesses: string[]
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, guesses, isRevealing }: Props) => {
  const statuses = getGuessDistances(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          guess={guess}
          guesses={guesses}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
