import React from 'react'

const Nav = () => {
  return (
    <header className="flex justify-between mb-8 pb-8 w-full">
    <a className="flex gap-1 justify-center items-center">
      <span className='text-2xl font-black tracking-widest'>Talk<span className='text-5xl rotate-[90deg] w-[30px] '>2</span>Text</span>
    </a>
  
    <nav className="flex gap-6 items-center text-slate-900/75">
      <a>Home</a>
      <a>Pricing</a>
      <a>Contact</a>
    </nav>
  </header>
  )
}

export default Nav