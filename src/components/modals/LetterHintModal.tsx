import { BaseModal } from './BaseModal'
import { CellSmall } from '../../components/grid/CellSmall'
import { VERY_CLOSE_DISTANCE, SOMEWHAT_CLOSE_DISTANCE } from '../../constants/settings'
import { getPossibleLetters } from '../../lib/statuses'

type Props = {
  guess?: string
  guesses?: string[]
  position?: number
  isOpen: boolean
  handleClose: () => void
  value?: string
  absStatus?: number
}

export const LetterHintModal = ({
  guess,
  guesses,
  position = 0,
  isOpen,
  handleClose,
  value,
  absStatus,
}: Props) => {
  const LetterHints = () => {
    if (!value || !absStatus || !guesses || position == undefined) {
      return <div>No hints available</div>
    }

    let cells = []
    let possibleLetters = getPossibleLetters(guesses, position)
    if (possibleLetters) {
      if (possibleLetters.length > 10) {
        return (
          <h1 className="text-xl ml-2.5 grow font-bold dark:text-white flex justify-center mb-1">
            Too many possibilities
          </h1>)
      }

      for (var i = 0; i < possibleLetters.length; i++) {
         cells.push(<CellSmall key={i} value={possibleLetters[i]} status={10} />)
      }
      return (
         <h1 className="text-xl ml-2.5 grow font-bold dark:text-white flex justify-center mb-1">
            {cells}
         </h1>)
    }

    

    const somewhatClose = absStatus != undefined && (absStatus > VERY_CLOSE_DISTANCE && absStatus <= SOMEWHAT_CLOSE_DISTANCE)
    const veryClose = absStatus != undefined && (absStatus > 0 && absStatus <= VERY_CLOSE_DISTANCE)

    let distance = absStatus   
    if (somewhatClose) {
      distance = SOMEWHAT_CLOSE_DISTANCE
    } else if (veryClose) {
      distance = VERY_CLOSE_DISTANCE
    }

    const currentLetterNumber = value.charCodeAt(0) - 65

    
    for (var i = -distance; i <= distance; i++) {
      let letterIndex = currentLetterNumber + i
      if (letterIndex >= 0 && letterIndex < 26 && (i == 0 || veryClose || Math.abs(i) > VERY_CLOSE_DISTANCE)) {
        let letter = String.fromCharCode(letterIndex + 65)
        if (i == 0) {
          cells.push(<CellSmall key={i} value={letter} status={distance} />)
        } else {
          cells.push(<CellSmall key={i} value={letter} status={10} />)
        }
      }
    }

    return (
       <h1 className="text-xl ml-2.5 grow font-bold dark:text-white flex justify-center mb-1">
         {cells}
       </h1>
    );
  };


  return (
    <BaseModal
      title="Possible Letters"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <LetterHints />
    </BaseModal>
  )
}
