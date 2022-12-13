import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { FileUpload } from 'primereact/fileupload'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'
import { Tooltip } from 'primereact/tooltip'
import { Tag } from 'primereact/tag'
import { XCircleIcon } from '@heroicons/react/20/solid'

const StagePhotos = () => {
  const [totalSize, setTotalSize] = useState(0)
  const toast = useRef(null)
  const fileUploadRef = useRef(null)

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options
    const value = totalSize / 10000
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : '0 B'

    return (
      <div
        className={className}
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {chooseButton}
        {/* {uploadButton}
        {cancelButton} */}
        {/* <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          style={{ width: '300px', height: '20px', marginLeft: 'auto' }}
        ></ProgressBar> */}
      </div>
    )
  }

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size)
    callback()
  }

  const itemTemplate = (file, props) => {
    return (
      <div className="flex flex-wrap items-center">
        <div className="relative flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
            className="border rounded-md"
          />
          <XCircleIcon
            className="absolute top-0 right-0 -top-1.5 -right-1.5 w-5 cursor-pointer"
            onClick={() => onTemplateRemove(file, props.onRemove)}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="font-medium leading-6 text-gray-900 text-md">Photos</h3>
      </div>
      <Toast ref={toast} />
      <FileUpload
        ref={fileUploadRef}
        name="files[]"
        url="http://localhost:3000/api/uploadFile"
        multiple
        accept="image/*"
        maxFileSize={1000000}
        // onUpload={onTemplateUpload}
        // onSelect={onTemplateSelect}
        // onError={onTemplateClear}
        // onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        // emptyTemplate={emptyTemplate}
        // chooseOptions={chooseOptions}
        // uploadOptions={uploadOptions}
        // cancelOptions={cancelOptions}
      />
    </>
  )
}

export default StagePhotos
