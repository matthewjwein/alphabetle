import { BaseModal } from './BaseModal'
import { CellSmall } from '../../components/grid/CellSmall'
import { VERY_CLOSE_DISTANCE, SOMEWHAT_CLOSE_DISTANCE } from '../../constants/settings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  value?: string
  veryClose?: boolean
}

export const LetterHintModal = ({
  isOpen,
  handleClose,
  value,
  veryClose,
}: Props) => {
  const LetterHints = () => {
    if (!value) {
      return <div>"help"</div>
    }

    var distance = SOMEWHAT_CLOSE_DISTANCE
    if (veryClose) {
      distance = VERY_CLOSE_DISTANCE
    }

    const currentLetterNumber = value.charCodeAt(0) - 65

    let cells = []
    for (var i = -distance; i <= distance; i++) {
      let letterIndex = currentLetterNumber + i
      if (letterIndex >= 0 && letterIndex < 26 && i != 0 && (veryClose || Math.abs(i) > VERY_CLOSE_DISTANCE)) {
        let letter = String.fromCharCode(letterIndex + 65)
        cells.push(<CellSmall key={1} value={letter} status={10} />)
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
