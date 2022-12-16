import AWS from 'aws-sdk'

export const s3Client = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ID,
  },
})

if (process.env.NODE_ENV !== 'production') global.s3Client = s3Client
