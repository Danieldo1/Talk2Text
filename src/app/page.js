import { Upload} from "./components/Icons"
import HeadersText from "./components/Headers"

import Presentation from "./components/Presentation"
export default function Home() {
  return (
    <>
      <HeadersText h1Text="Talk 2 Text" h2Text="Generate captions from video files in seconds make your new viral videos with Talk 2 Text" />
      <div className="text-center ">
        <button className="bg-blue-500 text-white rounded-xl text-xl px-4 py-2 mt-8 hover:bg-blue-800 inline-flex items-center gap-2">
        <Upload />
        Choose File
        </button>
      </div>
    <Presentation />
    </>
  )
}
