import clsx from 'clsx'
import React from 'react'

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm'

const fieldErrorClasses = 'focus:border-red-500 focus:ring-red-500 '

const checkboxClasses =
  'w-4 h-4 mr-2 mb-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500'

const errorClasses = 'text-red-600 text-sm basis-full'

const Label = ({ id, children }) => {
  return (
    <label
      htmlFor={id}
      className="block mb-1 text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  )
}

export const TextField = React.forwardRef(function TextField(
  { id, label, type = 'text', className = '', error, ...props },
  ref
) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input
        ref={ref}
        id={id}
        type={type}
        {...props}
        className={clsx(formClasses, error && fieldErrorClasses)}
      />
      {error && <span className={errorClasses}>{error.message}</span>}
    </div>
  )
})

export const TextArea = React.forwardRef(function TextArea(
  { id, label, rows = 4, className = '', error, ...props },
  ref
) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <textarea
        rows={rows}
        ref={ref}
        id={id}
        {...props}
        className={clsx(formClasses, error && fieldErrorClasses)}
      />
      {error && <span className={errorClasses}>{error.message}</span>}
    </div>
  )
})

export const SelectField = React.forwardRef(function SelectField(
  { id, label, className = '', ...props },
  ref
) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select
        ref={ref}
        id={id}
        {...props}
        className={clsx(formClasses, 'pr-8')}
      />
    </div>
  )
})

export const Checkbox = React.forwardRef(function Checkbox(
  { id, label, type = 'checkbox', className = '', error, ...props },
  ref
) {
  return (
    <div className={className}>
      <input
        ref={ref}
        id={id}
        type={type}
        {...props}
        className={clsx(checkboxClasses, error && fieldErrorClasses)}
      />
      {label && <Label id={id}>{label}</Label>}
      {error && <span className={errorClasses}>{error.message}</span>}
    </div>
  )
})
