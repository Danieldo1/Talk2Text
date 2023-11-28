'use client'


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { cleanTranscription } from '@/utils/utils'

const VideoPage = ({params}) => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionResponse, setTranscriptionResponse] = useState([]);
  const filename = params.filename
  

  useEffect(() => {
getTranscription()
  },[filename])



  const getTranscription = () => {
    axios.get(`/api/transcribe?filename=${filename}`).then(res => {

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


  return (
    <div>
    <div> is transcribing: {JSON.stringify(isTranscribing)}</div>
    {transcriptionResponse.length >0 && transcriptionResponse.map(i => (
      <div >
      <span className='text-white/50 mr-2'>{i.start_time} -{i.end_time} </span>
      <span> {i.content}</span>
  </div>
    ))}
    </div>
  )
}

export default VideoPage