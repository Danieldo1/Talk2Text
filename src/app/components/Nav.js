import React from 'react'
import Link from 'next/link'
const Nav = () => {
  return (
    <header className="flex justify-between mb-8 pb-8 w-full">
    <Link href={"/"} className="flex gap-1 justify-center items-center">
      <span className='text-2xl font-black tracking-widest rotate-[-4deg]'>Talk<span className='text-5xl w-[30px] '>2</span>Text</span>
    </Link>
  
    <nav className="flex gap-6 items-center text-white ">
      <Link href={"/"} className='hover:text-slate-300'>Home</Link>
      <Link href={"/pricing"} className='hover:text-slate-300'>Pricing</Link>
      <Link href={"/contact"} className='hover:text-slate-300'>Contact</Link>
    </nav>
  </header>
  )
}

export default Nav