import React from 'react'
import Header from './Header'

const AppShell = ({ children }) => {
  return (
    <div className="min-h-screen px-2 flex flex-col justify-center items-center h-full">
      <Header />
      <main className="py-20 flex flex-1 flex-col justify-center items-center">
        {children}
      </main>
    </div>
  )
}

export default AppShell
