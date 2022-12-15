import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const ActionButton = ({
  type,
  showIcon = true,
  onClick,
  className = '',
  children,
}) => {
  let title = ''
  let icon = ''
  let classes =
    'inline-flex items-center px-3 py-2 mr-2 text-sm font-medium leading-4 text-white border border-gray-200 rounded-sm shadow-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-offset-1'

  switch (type) {
    case 'activate':
      title = 'Activate'
      icon = <CheckIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
      classes += ' hover:bg-emerald-200 focus:ring-emerald-300'
      break

    case 'deactivate':
      title = 'Deactivate'
      icon = <XMarkIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
      classes += ' hover:bg-orange-200 focus:ring-orange-300'
      break

    case 'edit':
      title = 'Edit'
      icon = <PencilIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
      classes += ' hover:bg-sky-300 focus:ring-sky-400'
      break

    case 'delete':
      title = 'Delete'
      icon = <TrashIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
      classes += ' hover:bg-red-400 focus:ring-red-500'
      break

    case 'new':
      title = 'Add New'
      icon = <PlusIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
      classes += ' hover:bg-emerald-300 focus:ring-emerald-400 mr-0'
      break

    default:
      break
  }

  if (className) {
    classes += ` ${className}`
  }

  return (
    <button type="button" title={title} className={classes} onClick={onClick}>
      {showIcon && icon} {children && <span>{children}</span>}
    </button>
  )
}

export default ActionButton
