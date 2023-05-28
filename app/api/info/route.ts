import ytdl from "ytdl-core";
import { YoutubeVideoInfo } from "../../../types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing url", { status: 400 });
  }

  if (!ytdl.validateURL(url)) {
    return new Response("Invalid Url", {
      status: 400,
    });
  }

  const info = await ytdl.getBasicInfo(url);
  const videoId = ytdl.getVideoID(url);

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  const videoInfo: YoutubeVideoInfo = {
    title: info.videoDetails.title,
    thumbnail_url: thumbnail,
    fallback_thumbnail_url: fallbackThumbnail,
    video_url: url,
  };

  return new Response(JSON.stringify(videoInfo));
}
