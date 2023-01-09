import fs from 'fs'
import formidable from 'formidable'

import { validateRoute } from '../../../../lib/auth'
import { s3Client } from '../../../../lib/s3'

export default validateRoute(async (req, res, user) => {
  try {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true

    const url = ''

    const processFile = (file) => {
      return new Promise((resolve, reject) => {
        const fileName = `${new Date().toISOString()}-${file.originalFilename}`
        const fileStream = fs.createReadStream(file.filepath)

        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `${fileName}`,
          Body: fileStream,
        }

        s3Client.upload(uploadParams, (error, data) => {
          if (error) {
            reject(error)
          } else {
            resolve(data.Location)
          }
        })
      })
    }

    form.parse(req, (err, fields, files) => {
      const file = files.files
      processFile(file)
        .then((uploadResult) => {
          // set the urls array with the result returned by the s3Client.upload function

          // return a success response
          res.status(201).json({ success: true, data: { url: uploadResult } })
        })
        .catch((error) => {
          // return an error response
          res.send({ success: false, error: error.message })
        })
    })
  } catch (error) {
    // return an error response
    res.send({ success: false, error: error.message })
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}
