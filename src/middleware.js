import { NextResponse } from 'next/server'

const signedinPages = ['/', '/dashboard', '/projects', '/team']

export default function middleware(req) {
  const { origin, pathname } = req.nextUrl

  if (signedinPages.find((p) => p === pathname)) {
    const token = req.cookies.get('TGC_ACCESS_TOKEN')

    if (pathname === '/dashboard') {
      return NextResponse.redirect(`${origin}/projects`)
    }

    if (!token) {
      return NextResponse.redirect(`${origin}/login`)
    }
  }
}
