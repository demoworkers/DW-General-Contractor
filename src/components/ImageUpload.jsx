import { useState, useRef } from 'react'

import toast from 'react-hot-toast'

import { PlusIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/20/solid'

import { Spinner } from './Spinner'

const ImageUpload = ({
  userRole,
  sectionLabel = 'Photos',
  buttonId = 'files',
  images = [],
  onImagesUpdate,
}) => {
  const uploadButtonRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const uploadFiles = async (imageFiles) => {
    const formData = new FormData()
    for (let i = 0; i < imageFiles.length; i += 1) {
      formData.append('files', imageFiles[i])
    }

    const response = await fetch(
      `${window.location.origin}/api/upload/images`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const res = await response.json()

    if (res.success) {
      let updatedImageUrls = JSON.parse(JSON.stringify(images))
      updatedImageUrls = [...res.data.urls, ...updatedImageUrls]

      onImagesUpdate(updatedImageUrls)
    } else {
      // show error toast
      toast.error(res.error)
    }

    // reset file upload button
    uploadButtonRef.current.value = ''
  }

  const handleChange = async (event) => {
    setLoading(true)

    const selectedFiles = event.target.files
    const imageFiles = []

    for (let i = 0; i < selectedFiles.length; i += 1) {
      if (selectedFiles[i].type.startsWith('image/')) {
        imageFiles.push(selectedFiles[i])
      }
    }

    await uploadFiles(imageFiles)
    setLoading(false)
  }

  const handleImageRemove = (imageIndex) => {
    let updatedImageUrls = JSON.parse(JSON.stringify(images))
    updatedImageUrls = updatedImageUrls.filter(
      (image, imageIdx) => imageIdx !== imageIndex
    )

    onImagesUpdate(updatedImageUrls)
  }

  return (
    <>
      <div className="mt-6 mb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {sectionLabel}
        </h3>
        {!userRole.isUser && (
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <label
              htmlFor={buttonId}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-transparent border-gray-300 rounded-sm shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none"
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <PlusIcon className="w-4 h-4 mr-1" /> Add New
                </>
              )}
              <input
                ref={uploadButtonRef}
                id={buttonId}
                name="files"
                type="file"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-sm">
        <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {images.map((image, imageIdx) => (
            <div key={image} className="relative group">
              <div className="relative w-full overflow-hidden bg-gray-200 rounded-sm min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none">
                {!userRole.isUser && (
                  <button
                    type="button"
                    onClick={() => handleImageRemove(imageIdx)}
                    className="absolute -right-1 -top-0.5 hidden cursor-pointer hover:text-red-600 group-hover:block"
                  >
                    <XCircleIcon className="w-6 h-6 mr-1" />
                  </button>
                )}
                <img
                  src={image}
                  className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ImageUpload
