import React,{useEffect, useState, useRef} from 'react'
import { ApplyIcon } from '@/app/components/Icons'
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL,fetchFile } from '@ffmpeg/util';
import { convertSrt } from '@/utils/utils'
import roboto from './../../fonts/Roboto-Regular.ttf';
import robotoBold from './../../fonts/Roboto-Bold.ttf';

const Video = ({filename,transcriptionResponse}) => {
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);
    const videoURL = `https://talk-to-text.s3.amazonaws.com/${filename}`

    useEffect(() => {
        videoRef.current.src = videoURL
        load();
    },[])

    const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
        const ffmpeg = ffmpegRef.current;
        ffmpeg.on('log', ({ message }) => {
            console.log(message);
        });
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        setLoaded(true);
    }
    
    const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.writeFile(filename, await fetchFile(videoURL));
        const srt =convertSrt(transcriptionResponse)
        await ffmpeg.writeFile('sbt.srt', srt)

        await ffmpeg.exec([
            '-i',
         filename,
         '-preset', 'ultrafast',
         '-to', '00:00:05',
         '-vf', `subtitles=sbt.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=70'`,           'output.mp4']);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src =
            URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
    }


  return (
    <>
    <div className='overflow-hidden rounded-xl'>
        <video 
         ref={videoRef}
        className='aspect-16/9 ' 
        controls 
        data-video={0}
        > </video>
    </div>

    <div className='text-center'>
        <button 
        onClick={transcode}
        className="bg-blue-500 text-white rounded-xl text-xl px-4 py-2 mt-8 hover:bg-blue-800 inline-flex items-center gap-2 cursor-pointer">
            <ApplyIcon />
        Apply Captions
        </button>
    </div>
    </>
  )
}

export default Video