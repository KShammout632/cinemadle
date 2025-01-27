import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  value?: string
  status?: CharStatus
  isCompleted?: boolean
}

export const Cell = ({ value, status, isCompleted }: Props) => {
  const isFilled = value && !isCompleted
  const animationDelay = `${REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'w-full h-12 border-solid mb-1 border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      // 'correct shadowed bg-orange-500 text-white border-orange-500':
      //   status === 'correct' && isHighContrast,
      // 'present shadowed bg-cyan-500 text-white border-cyan-500':
      //   status === 'incorrect' && isHighContrast,
      'correct shadowed bg-green-500 text-white border-green-500':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-red-500 text-white border-red-500':
        status === 'incorrect' && !isHighContrast,
      'cell-fill-animation': isFilled,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container truncate" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
