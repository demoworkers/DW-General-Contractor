import fs from 'fs'

import { nanoid } from 'nanoid'
import formidable from 'formidable'

import { s3Client } from '../../../lib/s3'

import { validateRoute } from '../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const form = new formidable.IncomingForm()

  form.parse(req, function (err, fields, files) {
    // TODO: file type
    const fileName = nanoid() + '.png'
    const file = files.uploadedFile

    const fileStream = fs.createReadStream(file.filepath)

    fileStream.on('error', function (ersr) {
      console.log('File Error', ersr)
    })

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileStream,
    }

    s3Client.upload(uploadParams, function (error, data) {
      console.log(error)
      console.log(data)
    })
  })
})

export const config = {
  api: {
    bodyParser: false,
  },
}
