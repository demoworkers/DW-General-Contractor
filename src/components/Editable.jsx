import { useRef } from 'react'
import ContentEditable from 'react-contenteditable'

const Editable = ({ value = '' }) => {
  const text = useRef(value)

  const handleChange = (evt) => {
    text.current = evt.target.value
  }

  const handleBlur = () => {
    console.log(text.current)
  }
  return (
    <ContentEditable
      html={text.current}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  )
}

export default Editable
