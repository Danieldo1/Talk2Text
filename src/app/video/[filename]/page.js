'use client'


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { cleanTranscription } from '@/utils/utils'
import InputItem from '@/app/components/InputItem'
import { ApplyIcon } from '@/app/components/Icons'

const VideoPage = ({params}) => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionResponse, setTranscriptionResponse] = useState([]);
  const [fetching, setFetching] = useState(false);
  const filename = params.filename
  

  useEffect(() => {
getTranscription()
  },[filename])



  const getTranscription = () => {
    setFetching(true)
    axios.get(`/api/transcribe?filename=${filename}`).then(res => {
      setFetching(false)
      const status = res.data?.status
      const transcription = res.data?.resultFile

      console.log(transcription)

      if(status === undefined){
        setIsTranscribing(true)
        setTimeout(getTranscription,3000)
      } else {
        setIsTranscribing(false)
       
        setTranscriptionResponse(cleanTranscription(transcription.results.items))
      }

  
    })
  }


  if(isTranscribing){
    return <div>Transcribing...</div>
  }

  if(fetching){
    return <div>Fetching...</div>
  }

  return (
    <div className='grid grid-cols-2 gap-16 '>
      <div className=''>
      <h2 className='text-2xl mb-4 text-white/60'>Transcription</h2>
      <div className='my-1 grid grid-cols-3 gap-1 bg-purple-800 rounded-lg p-2 '>
        <div className=''>Start</div>
        <div className=''>End</div>
        <div className=''>Words</div>
      </div>
    {transcriptionResponse.length >0 && transcriptionResponse.map(i => (
     <InputItem i={i}  />
    ))}
      </div>

      <div>
        <h2 className='text-2xl mb-4 text-white/60'>Result</h2>

          <div className='overflow-hidden rounded-xl'>

            <video src={`https://talk-to-text.s3.amazonaws.com/${filename}`} className='aspect-16/9 ' controls > </video>
          </div>
         
          <div className='text-center'>
            <button className="bg-blue-500 text-white rounded-xl text-xl px-4 py-2 mt-8 hover:bg-blue-800 inline-flex items-center gap-2 cursor-pointer">
              <ApplyIcon />
              Apply Captions
            </button>
          </div>
      </div>
    </div>
  )
}

export default VideoPage