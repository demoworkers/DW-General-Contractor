const Badge = ({ type, children }) => {
  let classes =
    'inline-flex px-2 text-xs font-semibold leading-5 capitalize rounded-full'

  switch (type) {
    case 'success':
      classes += ' text-green-800 bg-green-100'
      break

    case 'danger':
      classes += ' text-red-800 bg-red-200'
      break

    default:
      break
  }

  return <span className={classes}>{children}</span>
}

export default Badge
