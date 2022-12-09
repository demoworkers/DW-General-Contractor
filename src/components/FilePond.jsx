import React, { useState } from 'react'

// Import React FilePond
import { FilePond as FP, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const FilePond = ({ files, setFiles }) => {
  return (
    <div className="pt-2 mt-2">
      <FP
        files={files}
        onupdatefiles={setFiles}
        allowMultiple
        maxFiles={3}
        server="/api/uploadFile"
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle="Attach file"
      />
    </div>
  )
}

export default FilePond
