'use client'
import axios from 'axios'
import {UploadBTN,Spinner }from './Icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Upload = () => {
    const [loading,setLoading] = useState(false);

    const router = useRouter();


    const uploadVideo = async (event) => {
        event.preventDefault();
        const files = event.target?.files;
        if(files.length >0){
            const file = files[0];
            setLoading(true);
            const res = await axios.postForm('/api/upload',{
                file,
            })
            setLoading(false);
            
            const newName= res.data.newName;

            router.push(`/video/${newName}`)
        }



      }



  return (
    <>
    <div className="text-center ">
        {loading ? (
             <label  className="bg-blue-500 text-white rounded-xl text-xl px-4 py-2 mt-8 hover:bg-blue-800 inline-flex items-center gap-2 cursor-pointer">
             <Spinner />
             Uploading
           <input disabled type="file" className="hidden" />
             </label>
       
        ):(
            <label className="bg-blue-500 text-white rounded-xl text-xl px-4 py-2 mt-8 hover:bg-blue-800 inline-flex items-center gap-2 cursor-pointer">
            <UploadBTN />
            Choose File
          <input onChange={uploadVideo} type="file" className="hidden" />
            </label>
        )}
      </div>
     
    </>
  )
}

export default Upload