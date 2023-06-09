import ytdl from "ytdl-core";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const format = searchParams.get("format");

  if (!url || !format) {
    return new Response("Url or Format missing but are required", {
      status: 400,
    });
  }

  if (!ytdl.validateURL(url)) {
    return new Response("Invalid Url", {
      status: 400,
    });
  }

  const info = await ytdl.getBasicInfo(url);
  const videoTitile = info.videoDetails.title.split(" ").join("");

  switch (format) {
    case "mp3": {
      const stream = ytdl(url, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      });

      return new Response(stream as any, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": `attachment; filename=${videoTitile}.mp3`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }
}
