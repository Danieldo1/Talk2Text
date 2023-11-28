'use client'


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { cleanTranscription } from '@/utils/utils'
import Video from '@/app/components/Video'
import Transcription from '@/app/components/Transcription'

const VideoPage = ({params}) => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionResponse, setTranscriptionResponse] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
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
    <div>
    <div className='grid grid-cols-2 gap-16 '>
      <Transcription 
      transcriptionResponse={transcriptionResponse} 
      setTranscriptionResponse={setTranscriptionResponse} 
      />
      <div>
        <h2 className='text-2xl mb-4 text-white/60'>Result</h2>
        <Video filename={filename} transcriptionResponse={transcriptionResponse} />
      </div>
    </div>
    </div>
  )
}

export default VideoPage