import { auth } from '@/auth'
import { NextResponse } from 'next/server'

// Public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register']
// Routes only accessible to ADMIN
const adminRoutes = ['/admin']
// Routes that require authentication (any role)
const protectedRoutes = ['/dashboard', '/grupos', '/estudiantes', '/asignaturas']

export default auth((req) => {
    const { nextUrl, auth: session } = req
    const pathname = nextUrl.pathname

    const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + '/')
    )
    const isApiAuthRoute = pathname.startsWith('/api/auth')
    const isAdminRoute = adminRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + '/')
    )
    const isProtectedRoute = protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + '/')
    )

    // Allow API auth routes always
    if (isApiAuthRoute) return NextResponse.next()

    // Allow public routes always
    if (isPublicRoute) return NextResponse.next()

    // Not authenticated → redirect to login
    if (!session) {
        const loginUrl = new URL('/login', nextUrl.origin)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Authenticated but USER tries to access admin routes → redirect to dashboard
    if (isAdminRoute && session.user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', nextUrl.origin))
    }

    return NextResponse.next()
})

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
