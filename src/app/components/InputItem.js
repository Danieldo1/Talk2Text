

export default function InputItem({i,handleStartTime,handleEndTime,handleContent}) {
   if(!i){
    return ''
   }
    return(
  
  <div className='my-1 grid grid-cols-3 gap-1 items-center' >
    <input type="text" value={i.start_time} 
    onChange={handleStartTime}
    className='text-white/60 bg-transparent p-1 rounded-lg'
    />
    <input type="text" value={i.end_time}
    onChange={handleEndTime}
    className='text-white/60 bg-transparent p-1 rounded-lg'
    />
    <input type="text" value={i.content}
    onChange={handleContent}
    className='text-white/60 bg-transparent p-1 w-fit rounded-lg'
    />
    
  </div>
   
    )
}