import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import nc from 'next-connect'
import cors from 'cors'

import { prisma } from '../../../lib/prisma'

const handler = nc()
  .use(cors())
  .post(async (req, res) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
          role: user.role,
          time: Date.now(),
          approved: user.approved,
        },
        process.env.JWT_SECRET,
        { expiresIn: '72h' }
      )

      res.setHeader(
        'Set-Cookie',
        cookie.serialize(process.env.JWT_COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: 72 * 60 * 60,
          path: '/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        })
      )

      res.json(user)
    } else {
      res.status(401)
      res.json({ error: 'Email or Password is wrong' })
    }
  })

export default handler
