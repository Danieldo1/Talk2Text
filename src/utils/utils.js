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