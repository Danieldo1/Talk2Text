export const cleanTranscription = (items) => {
  items.forEach((element,key) => {
        if(!element.start_time){
          items[key-1].alternatives[0].content += element.alternatives[0].content
          delete items[key]
        }
        });

     return items.map(i => {
            const {
               start_time,
               end_time,
             } = i
    const content = i.alternatives[0].content
   
             return {
               start_time,
               end_time,
               content
             }
   
           })
}

const getTime = (time) => {
    const d = new Date(parseFloat(time) * 1000)
    return d.toISOString().slice(11,23).replace('.',',')
}

export const convertSrt = (items) => {
    let str = ''
    let count = 1
    items.forEach((element,key) => {
        str+=count + '\n'
        const {start_time,end_time}= element
        str += getTime(start_time) + ' --> ' + getTime(end_time) + '\n'
        str +=element.content + '\n'
        str +='\n'
        count ++
    })
    return str
}