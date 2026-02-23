import { ReactNode } from 'react'

import './globals.css'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | TailsCare',
    default: 'TailsCare - Monitoring for cats and dogs',
  },
  description: 'The best app for your pets',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
