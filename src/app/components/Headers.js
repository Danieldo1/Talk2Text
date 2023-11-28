import React from 'react'

const HeadersText = ({
    h1Text= 'Hello',
    h2Text= 'World'
}) => {
  return (
    <div className="text-center mt-6 mb-4">
    <h1 className="text-3xl font-black tracking-widest leading-none md:text-5xl px-10 text-gray-700 rotate-[-4deg]" style={{textShadow: "0 2px 4px rgba(255, 255, 255, 0.25)"}}>{h1Text}</h1>
    <h2 className="text-xl mt-4 md:text-2xl px-10 text-gray-500">{h2Text}</h2>
    </div>
  )
}

export default HeadersText