import type { Metadata } from 'next'

import { ThemeRegistry } from '@/components/ThemeRegistry'
import { colors } from '@/styles/colors'

const APP_NAME = "Sweet's Confeitaria"

export const metadata: Metadata = {
  title: APP_NAME,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: colors.c3.hex(),
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  manifest: '/manifest.json',
  icons: [{ rel: 'shortcut icon', url: '/favicon.ico' }],
  keywords: ["sweet's confeitaria", 'confeitaria'],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
