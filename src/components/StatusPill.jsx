import clsx from 'clsx'
import { titleCase } from '../../utils/formattedString'

const contrainerClasses =
  'absolute ml-3 mt-2 inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium tracking-normal'
const dotClasses = 'w-2 h-2 mr-1 rounded-full'

const StatusPill = ({ status = 'success', label = '' }) => {
  const container = clsx(contrainerClasses, {
    'border-emerald-300 bg-emerald-100 text-emerald-500': status === 'success',
    'border-red-300 bg-red-100 text-red-500': status === 'danger',
  })
  const dot = clsx(dotClasses, {
    'bg-emerald-400': status === 'success',
    'bg-red-400': status === 'danger',
  })

  return (
    <span className={container}>
      <div className={dot} />
      {titleCase(label)}
    </span>
  )
}

export default StatusPill
