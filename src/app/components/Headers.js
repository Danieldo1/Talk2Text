import React from 'react'

const HeadersText = ({
    h1Text= 'Hello',
    h2Text= 'World'
}) => {
  return (
    <div className="text-center mt-16 mb-8">
    <h1 className="text-3xl font-bold md:text-5xl px-10" style={{textShadow: "0 2px 4px rgba(255, 255, 255, 0.25)"}}>{h1Text}</h1>
    <h2 className="text-xl mt-4 md:text-2xl px-10">{h2Text}</h2>
    </div>
  )
}

export default HeadersText