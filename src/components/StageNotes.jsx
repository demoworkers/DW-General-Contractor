import { useEffect, useRef, useState } from 'react'

const CONFIG = {
  toolbar: [
    'undo',
    'redo',
    '|',
    // 'heading',
    // '|',
    'bold',
    'italic',
    'blockQuote',
    'link',
    'numberedList',
    'bulletedList',
    // 'imageUpload',
    'insertTable',
    'mediaEmbed',
  ],
}

const StageNotes = ({ notes, setNotes }) => {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }
    setEditorLoaded(true)
  }, [])
  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="font-medium leading-6 text-gray-900 text-md">Notes</h3>
      </div>
      {editorLoaded && (
        <CKEditor
          editor={ClassicEditor}
          data={notes}
          config={CONFIG}
          onChange={(event, editor) => {
            const data = editor.getData()
            setNotes(data)
          }}
        />
      )}
    </>
  )
}

export default StageNotes
