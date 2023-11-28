import Upload from "./components/Upload"
import HeadersText from "./components/Headers"

import Presentation from "./components/Presentation"
export default function Home() {

  
  return (
    <div className="bg-white p-10 rounded-xl border border-gray-600">
      <HeadersText h1Text="Talk 2 Text" h2Text="Generate captions from video files in seconds make your new viral videos with Talk 2 Text" />
      <Upload />
    <Presentation />
    </div>
  )
}
