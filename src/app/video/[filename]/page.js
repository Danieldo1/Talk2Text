'use client'


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { cleanTranscription } from '@/utils/utils'
import Video from '@/app/components/Video'
import Transcription from '@/app/components/Transcription'
import classNames from 'classnames';
import { EditBTN } from '@/app/components/Icons'

const VideoPage = ({params}) => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionResponse, setTranscriptionResponse] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const filename = params.filename
  const containerClass = classNames('grid', { 
    'grid-cols-2 gap-5': isOpen, 
    'justify-center items-center': !isOpen, 
    'col-start-2': isOpen 
  });
  

  useEffect(() => {
getTranscription()
  },[filename])



  const getTranscription = () => {

    setFetching(true)
    axios.get(`/api/transcribe?filename=${filename}`).then(res => {
      setFetching(false)
      const status = res.data?.status
      const transcription = res.data?.resultFile


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
    <div className={containerClass}>
      {isOpen && (
        <Transcription 
          transcriptionResponse={transcriptionResponse} 
          setTranscriptionResponse={setTranscriptionResponse} 
        />
      )}
      <div className={classNames('justify-center max-w-xs items-center text-center', { 'col-start-2': isOpen })}>
        <h2 className='text-2xl mx-4 mb-4 justify-start text-left text-white/60'>Result</h2>
        <Video filename={filename} transcriptionResponse={transcriptionResponse} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 text-white inline-flex justify-center text-center rounded-xl text-xl px-4 py-2 mt-8 hover:bg-blue-800 items-center gap-2 cursor-pointer"
        >
          <EditBTN />
          {isOpen ? 'Save Changes' : 'Edit Captions'}
        </button>
      </div>
    </div>
  </div>
  )
}

export default VideoPage