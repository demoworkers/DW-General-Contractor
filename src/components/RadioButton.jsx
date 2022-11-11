import React from 'react'

export const RadioButton = React.forwardRef(function RadioButton(
  { id, label, children, ...props },
  ref
) {
  return (
    <div className="mt-2 space-y-5">
      <div className="relative flex items-start">
        <div className="absolute flex items-center h-5">
          <input
            ref={ref}
            {...props}
            id={id}
            type="radio"
            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
        </div>
        <div className="text-sm pl-7">
          <label htmlFor={id} className="font-medium text-gray-900">
            {children}
          </label>
        </div>
      </div>
    </div>
  )
})
