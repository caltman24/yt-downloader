import ytdl from "ytdl-core";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  const stream = ytdl("https://www.youtube.com/watch?v=y_QDPRBRY68", {
    quality: "highest",
  });

  console.log(stream, "sd");

  response.setHeader("Content-Disposition", "");
  response.writeHead(200, {
    "Content-Disposition": "attatchment; filename=video.mp4",
    "Content-Transfer-Encoding": "binary",
    "Content-Type": "application/octet-stream",
  });

  stream.pipe(response);
}
