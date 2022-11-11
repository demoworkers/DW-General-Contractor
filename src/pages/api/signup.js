import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import nc from 'next-connect'
import cors from 'cors'

import { prisma } from '../../../lib/prisma'

const handler = nc()
  .use(cors())
  .post(async (req, res) => {
    const salt = bcrypt.genSaltSync()
    const { firstName, lastName, email, password, acceptTerms } = req.body.data

    let user

    try {
      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: bcrypt.hashSync(password, salt),
          acceptTerms,
        },
      })

      if (!user) {
        res.status(500)
        res.json({ error: 'User could not be created' })
      }
    } catch (e) {
      res.status(401)
      res.json({ error: 'User already exists' })
      return
    }

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
  })

export default handler
