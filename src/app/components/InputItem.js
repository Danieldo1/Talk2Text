import React, { useEffect, useState } from 'react'

export default function InputItem({i}){
    const [startTime, setStartTime] = useState(i.start_time)
    const [endTime, setEndTime] = useState(i.end_time)
    const [content, setContent] = useState(i.content)
    return(
  
  <div className='my-1 grid grid-cols-3 gap-1 items-center' >
    <input type="text" value={startTime} 
    onChange={e => setStartTime(e.target.value)}
    className='text-white/60 bg-transparent p-1 rounded-lg'
    />
    <input type="text" value={endTime}
    onChange={e => setEndTime(e.target.value)}
    className='text-white/60 bg-transparent p-1 rounded-lg'
    />
    <input type="text" value={content}
    onChange={e => setContent(e.target.value)}
    className='text-white/60 bg-transparent p-1 w-fit rounded-lg'
    />
    
  </div>
   
    )
}