import Upload from "./components/Upload"
import HeadersText from "./components/Headers"

import Presentation from "./components/Presentation"
export default function Home() {

  
  return (
    <>
      <HeadersText h1Text="Talk 2 Text" h2Text="Generate captions from video files in seconds make your new viral videos with Talk 2 Text" />
      <Upload />
    <Presentation />
    </>
  )
}
