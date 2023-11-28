import React,{useEffect, useState, useRef} from 'react'
import { ApplyIcon } from '@/app/components/Icons'
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL,fetchFile } from '@ffmpeg/util';
import { convertSrt } from '@/utils/utils'
import Slider from './Slider';
import FontSizeSlider from './FontSlider';
import roboto from './../../fonts/Roboto-Regular.ttf';
import robotoBold from './../../fonts/Roboto-Bold.ttf';
import { useRouter } from 'next/navigation';

const Video = ({filename,transcriptionResponse}) => {
    const [loaded, setLoaded] = useState(false);
    const [primary, setPrimary] = useState('#FFFFFF');
    const [outline, setOutline] = useState('#000000');
    const [progress, setProgress] = useState(1);
    const [marginV, setMarginV] = useState(20);
    const [fontSize, setFontSize] = useState(20);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);
    const videoURL = `https://talk-to-text.s3.amazonaws.com/${filename}`
    const router = useRouter();

    useEffect(() => {
        videoRef.current.src = videoURL;
        load();
    },[])

    const load = async () => {
        const ffmpeg = ffmpegRef.current;
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        setLoaded(true);
    }

    const rgbToAss =(rgb) => {
        const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3) 

    return '&H'+ bgr +'&'
    }
    
    const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        const srt =convertSrt(transcriptionResponse)
        await ffmpeg.writeFile(filename, await fetchFile(videoURL));
        await ffmpeg.writeFile('sbt.srt', srt)

        videoRef.current.src = videoURL

        await new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = resolve
        })
        const duration = videoRef.current.duration
        ffmpeg.on('log', ({ message }) => {
            const regex = /time=([0-9:.]+)/.exec(message);
            if(regex && regex?.[1]){
                const time = regex?.[1]
               const [h,m,s] = time.split(':')
               const total = h* 3600 + m * 60 + s
               const videoProgress = total / duration
               setProgress(videoProgress)
            }

            if(duration > 57){
                alert('Video too long')
                router.back()
                throw new Error('Video too long')
                
            }
            
            
            
        });
        await ffmpeg.exec([
            '-i',
         filename,
         '-to', '00:00:05',
         '-preset', 'ultrafast',
         '-vf', `subtitles=sbt.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=${fontSize},MarginV=${marginV},PrimaryColour=${rgbToAss(primary)},OutlineColour=${rgbToAss(outline)}'`,           'output.mp4']);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src =
            URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
            setProgress(1)
    }


  return (
    <>
    <div className='overflow-hidden rounded-xl relative'>
        {progress && progress<1 && (
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center '>
                <div className='text-center w-full'>
                <h3 className='text-white text-3xl' >{parseInt(progress*100)}%</h3>
                    <div className='bg-white mx-10 rounded-lg overflow-hidden' >
                        <div className='bg-black h-4' style={{width: `${progress*100}%`}}>
                       
                        </div>
                    </div>
                </div>
            </div>
        )}
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
        className="bg-blue-500 text-white rounded-xl w-full text-center justify-center text-xl px-4 py-2 mt-8 hover:bg-blue-800 inline-flex items-center gap-2 cursor-pointer">
            <ApplyIcon />
        Apply Captions
        </button>
        <div className='py-5 rounded-lg w-full inline-block gap-4 bg-blue-500  mt-4'>
        <span className='flex justify-center md:inline-block'>Text Color</span>
        <input type='color' value={primary} onChange={(e) => setPrimary(e.target.value)} className='md:ml-8 rounded-md'  />
       <br />
       <span className='flex justify-center md:inline-block'>Outline Color</span>
        <input type='color' value={outline} onChange={(e) => setOutline(e.target.value)} className='md:ml-2 rounded-md' />
           
            <div className='md:inline-flex p-3 justify-center'>
               <span className='flex justify-center md:inline-block'>Text Position</span>
            <Slider
            value={marginV}
            min={0}
            max={100}
            onChange={(value) => setMarginV(value)}
            />
     
        <span >{marginV}%</span>
            </div>
            <div className='md:inline-flex p-3 justify-center'>
               <span className='flex md:inline-block  justify-center mr-7'>Font Size</span>
            <FontSizeSlider
        min={10}
        max={60}
        value={fontSize}
        onChange={(value) => setFontSize(value)}
        />
        <span >{fontSize}px</span>
       </div>
        </div>
    </div>
    </>
  )
}

export default Video