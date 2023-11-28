'use client'
import axios from 'axios'
import {UploadBTN,Spinner }from './Icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileUploader } from "react-drag-drop-files";

const fileTypes =  ["MP4"];

const Upload = () => {
    const [loading,setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const router = useRouter();

    const handleChange = (file) => {
      setFile(file);
    };

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

      const boxArea = <div className='dropArea w-[300px] h-[300px] flex justify-center items-center text-3xl uppercase font-bold'>Drop it like its hot</div>

  return (
    <>
    <div className="text-center ">
        {loading ? (
             <label  className="bg-blue-500 text-white rounded-xl text-xl px-4 py-2 mt-8 hover:bg-blue-800 inline-flex items-center gap-2 cursor-pointer">
             <Spinner />
             <FileUploader handleChange={handleChange} name="file" types={fileTypes} disabled={true} />
             </label>
       
        ):(
            <label className="bg-blue-500  text-white  rounded-xl text-xl px-4 py-2 mt-8 hover:bg-blue-800 inline-flex items-center gap-2 cursor-pointer">
           
            <FileUploader handleChange={handleChange} name="file" multiple={false} types={fileTypes} required={true} dropMessageStyle={{color:'black',fontWeight:'bold',backgroundColor:'white',opacity:1}} children={boxArea} />
            <br />
            <button onClick={() => setFile(null)} className='hover:text-gray-400'>X</button>
            </label>
        )}
      </div>
     
    </>
  )
}

export default Upload