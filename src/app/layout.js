import { Poppins } from 'next/font/google'
import './globals.css'
import Nav from './components/Nav'

const poppins = Poppins({
  weight: ['400','100','300','500','700','900'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Talk 2 Text',
  description: 'Generate captions from video files in seconds make your new viral videos with Talk 2 Text',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className+' bg-gradient-to-br from-purple-900 via-indigo-600 to-transparent  text-slate-100 min-h-screen'}>
      <main className="p-4 max-w-7xl mx-auto">
        <Nav />
        {children}
      </main>
      </body>
    </html>
  )
}
