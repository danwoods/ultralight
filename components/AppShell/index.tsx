import React from 'react'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

const AppShell = ({ children }: Props) => {
  return (
    <div className='min-h-screen px-2 flex flex-col justify-center items-center h-full max-h-screen overflow-hidden'>
      <Header />
      <main className='py-20 flex flex-1 flex-col justify-center items-center w-full px-2 mt-16'>
        {children}
      </main>
    </div>
  )
}

export default AppShell
