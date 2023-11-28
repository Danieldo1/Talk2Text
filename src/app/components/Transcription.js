import React from 'react'
import InputItem from './InputItem'

const Transcription = ({transcriptionResponse,setTranscriptionResponse}) => {
  const handleApply = (index,prop,e) => {
    const newItems = [...transcriptionResponse]
    newItems[index][prop] = e.target.value
    setTranscriptionResponse(newItems)
  }

  return (
    <div className=''>
      <h2 className='text-2xl mb-4 text-white/60'>Transcription</h2>
      <div className='my-1 grid grid-cols-3 gap-1 bg-purple-800 rounded-lg p-2 '>
        <div className=''>Start</div>
        <div className=''>End</div>
        <div className=''>Words</div>
      </div>
      {transcriptionResponse.length > 0 && (
        <div>
          {transcriptionResponse.map((i,key) => (
            <div key={key}>
          <InputItem i={i} 
          handleStartTime={(e)=>handleApply(key,'start_time',e)} 
          handleEndTime={(e)=>handleApply(key,'end_time',e)} 
          handleContent={(e)=>handleApply(key,'content',e)}  />
          </div>
            ))}
              </div>
                )}
            </div>
  )
}

export default Transcription