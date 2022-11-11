import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export const validateRoute = (handler) => {
  return async (req, res) => {
    const token = req.cookies[process.env.JWT_COOKIE_NAME]

    if (token) {
      let user
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        console.log(error)
        res.status(401)
        res.json({ error: 'Not Authorizied', status: 401 })
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not Authorizied', status: 401 })
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_SECRET)
  return user
}
