'use client'
import { AppProvider } from "./context/AppContext"
import './globals.css'
export default function RootLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
