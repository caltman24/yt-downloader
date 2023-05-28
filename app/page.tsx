'use client'
import { useEffect, useState } from "react"



const BASE_URL = "http://localhost:3000"

type ValidFileFormats = "mp3"

async function downloadYoutubeVideo(url: string, format: ValidFileFormats) {
  const res = await fetch(`${BASE_URL}/api/download?url=${url}&format=${format}`, {
    method: "POST",
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": "attachment; filename=audio.mp3",
      "Access-Control-Allow-Origin": "*",
    },
  })

  return res.blob()
}

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [format, setFormat] = useState<ValidFileFormats>("mp3")

  return (
    <main className="grid justify-center">
      <div className="mt-36">
        <h2 className="text-4xl font-bold">Paste in your video url to get started!</h2>

        <div className="flex gap-5 mt-10">
          <div>
            <label htmlFor="videoUrl" className="mr-5">Video Url:</label>
            <input type="text" name="videoUrl" id="videoUrl" className="px-2 py-1 text-white rounded-md bg-slate-800"
              value={videoUrl}
              onChange={(e) => { setVideoUrl(e.target.value) }} />
          </div>

          <div>
            <label htmlFor="format" className="mr-5">Select Format:</label>
            <select name="format" id="format" value={format} onChange={(e) => setFormat(e.target.value as ValidFileFormats)} className="px-2 py-1 text-white rounded-md bg-slate-800">
              <option value="mp3">mp3</option>
            </select>

          </div>
        </div>

        {
          videoUrl.length > 0 && (
            <a href={`${BASE_URL}/api/download?url=${videoUrl}&format=${format}`}>

              <button className="px-3 py-2 mt-5 bg-red-500 rounded-md hover:bg-red-600 hover:bg-opacity-70">Download</button>
            </a>

          )
        }
      </div>
    </main>
  )
}
