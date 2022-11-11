import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { fileFetcher } from '../../lib/fetcher'

import DropzoneArea from './DropzoneArea'

const Dropzone = () => {
  const onDrop = useCallback(async (files) => {
    const file = files[0]
    // const fileName = encodeURIComponent(file.name)
    // const fileType = file.type.split('.').pop()

    const formData = new FormData()
    formData.append('uploadedFile', file)

    const response = await fetch(`${window.location.origin}/api/uploadFile`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    console.log(data)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <DropzoneArea isDragActive={isDragActive} />
    </div>
  )
}

export default Dropzone
