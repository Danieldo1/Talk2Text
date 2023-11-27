'use client'


import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
        setTranscriptionResponse(transcription.results.items)
      }

  
    })
  }


  return (
    <div>
    {filename}
    <div> is transcribing: {JSON.stringify(isTranscribing)}</div>
    {transcriptionResponse.length >0 && transcriptionResponse.map(i => (
      <div>{i.start_time} -{i.end_time} - {i.alternatives[0].content}
      <span></span>
  </div>
    ))}
    </div>
  )
}

export default VideoPage