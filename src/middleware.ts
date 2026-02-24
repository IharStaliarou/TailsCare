import { routing } from '@/shared/config/i18n'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware(routing)

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
}
