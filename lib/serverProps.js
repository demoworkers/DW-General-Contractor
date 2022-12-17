import jwt from 'jsonwebtoken'

import { prisma } from './prisma'

import { validateToken } from './auth'

const adminRoutes = ['/team']

export default async function getServerSideProps(ctx) {
  const { req, resolvedUrl } = ctx

  let user

  const token = req.cookies[process.env.JWT_COOKIE_NAME]

  if (token) {
    // IS USER APPROVED
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    try {
      user = await prisma.user.findUnique({
        where: { id },
        select: { approved: true, role: true },
      })
    } catch (e) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    // NO USER
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    // USER NOT APPROVED
    if (!user.approved) {
      return {
        redirect: {
          destination: '/pending-verification',
          permanent: false,
        },
      }
    }

    // CHECK ADMIN PRIVILEGE
    // if (adminRoutes.find((p) => p === resolvedUrl) && user.role !== 'ADMIN') {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false,
    //     },
    //   }
    // }
  }

  const props = {}

  if (user && user.role) {
    props.userRole = {
      isAdmin: user.role === 'ADMIN',
      isManager: user.role === 'MANAGER',
      isDesigner: user.role === 'DESIGNER',
      isTrades: user.role === 'TRADES',
      isUser: user.role === 'USER',
    }
  }

  return { props }
}
