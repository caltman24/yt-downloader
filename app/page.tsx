'use client'
import { YoutubeVideoInfo } from "@/types";
import { FormEvent, useState } from "react"

type ValidFileFormats = "mp3"

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://simply-yt.vercel.app"

console.log(process.env)


async function fetchVideoInfo(url: string) {
  if (url.length === 0) throw new Error("Url is empty")
  const response = await fetch(`${BASE_URL}/api/info?url=${url}`)
  const data: YoutubeVideoInfo = await response.json()
  return data
}

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [format, setFormat] = useState<ValidFileFormats>("mp3")
  const [urlSubmited, setUrlSubmited] = useState(false)
  const [videoInfo, setVideoInfo] = useState<YoutubeVideoInfo>()
  const [urlError, setUrlError] = useState("")

  async function showVideoInfo(e: FormEvent) {
    e.preventDefault()

    try {
      const videoInfo = await fetchVideoInfo(videoUrl)

      setVideoInfo(videoInfo)
      setUrlSubmited(true)
      setUrlError("")
    } catch (e) {
      setVideoInfo(undefined)
      setUrlSubmited(false)
      setUrlError("Invalid url")
    }
  }

  return (
    <main className="px-4 pt-10">
      <h2 className="text-4xl font-bold text-center">Paste in your video url to get started!</h2>
      <div className="grid col-span-2 gap-5 m-auto mt-16 max-w-7xl md:grid-cols-2">

        <form onSubmit={showVideoInfo} className="flex flex-col gap-5 mt-10">
          <div>
            <label htmlFor="videoUrl" className="mr-5">Video Url:</label>
            <input type="url" name="videoUrl" id="videoUrl" className="w-full px-2 py-1 text-white rounded-md bg-slate-800"
              required
              value={videoUrl}
              onChange={(e) => { setVideoUrl(e.target.value) }} />
          </div>

          <div>
            <label htmlFor="format" className="mr-5">Select Format:</label>
            <select name="format" id="format" value={format} onChange={(e) => setFormat(e.target.value as ValidFileFormats)} className="px-2 py-1 text-white rounded-md bg-slate-800">
              <option value="mp3">mp3</option>
            </select>

          </div>
          <button className="px-3 py-2 font-bold rounded-md bg-cyan-600 hover:bg-cyan-700 hover:bg-opacity-80 text-neutral-950" type="submit">Select</button>
          <span className="text-red-600">{urlError}</span>
        </form>

        <div className="flex flex-col items-center justify-center text-center">
          {urlSubmited && (
            <div className="mb-5 tracking-wide">
              <p className="mb-5 text-lg">{videoInfo?.title}</p>
              <div className="w-full md:max-w-[550px] m-auto">
                <picture>
                  <source srcSet={videoInfo?.thumbnail_url} type="image/jpeg" />
                  <img src={videoInfo?.thumbnail_url} className="block w-full h-auto shadow-lg" alt="" />
                </picture>
              </div>
            </div>
          )}
          {urlSubmited && (
            <a href={`${BASE_URL}/api/download?url=${videoUrl}&format=${format}`}>

              <button className="px-4 py-3 mt-5 text-xl tracking-wide bg-red-600 rounded-md hover:bg-red-700 hover:bg-opacity-80">Download</button>
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
