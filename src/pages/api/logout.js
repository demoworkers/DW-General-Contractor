import cookie from 'cookie'
import { validateRoute } from '../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(process.env.JWT_COOKIE_NAME, null, {
      httpOnly: true,
      maxAge: 1,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
  )

  res.json({})
})
