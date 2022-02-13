import classnames from 'classnames'
import { REVEAL_TIME_MS, VERY_CLOSE_DISTANCE, SOMEWHAT_CLOSE_DISTANCE } from '../../constants/settings'

type Props = {
  value?: string
  status?: number
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`

  const absStatus = status ? Math.abs(status) : undefined

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        status == undefined,
      'correct shadowed bg-green-500 text-white border-white-500':
        status == 0,
      'present shadowed bg-yellow-500 text-white border-yellow-500':
        absStatus != undefined && (absStatus > 0 && absStatus <= VERY_CLOSE_DISTANCE),
      'present shadowed bg-red-500 text-white border-red-500':
        absStatus != undefined && (absStatus > VERY_CLOSE_DISTANCE && absStatus <= SOMEWHAT_CLOSE_DISTANCE),
      'present shadowed bg-gray-500 text-white border-gray-500':
        absStatus != undefined && (absStatus > SOMEWHAT_CLOSE_DISTANCE),
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
