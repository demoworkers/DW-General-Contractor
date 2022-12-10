import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { FileUpload } from 'primereact/fileupload'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'
import { Tooltip } from 'primereact/tooltip'
import { Tag } from 'primereact/tag'

export const StagePhotos = () => {
  const toast = useRef(null)
  const fileUploadRef = useRef(null)

  const onUpload = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    })
  }

  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="font-medium leading-6 text-gray-900 text-md">Photos</h3>
      </div>
      <Toast ref={toast} />
      <FileUpload
        name="files[]"
        url="http://localhost:3000/api/uploadFile"
        onUpload={onUpload}
        multiple
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
    </>
  )
}

export default StagePhotos
