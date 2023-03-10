import React, { useState } from "react";
import axios from "axios";
import FileSaver from "file-saver";

function Tiktok() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        "https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index",
        {
          params: { url },
          headers: {
            "X-RapidAPI-Key": "5fe8221b2cmshc62b62f1492688dp1d9d5ejsnc517524b5e2d",
            "X-RapidAPI-Host":
              "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
          },
          responseType: "blob",
        }
      );
      FileSaver.saveAs(response.data, "tiktok_video.mp4");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>TikTok Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <label>
          TikTok Video URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Download"}
        </button>
      </form>
    </div>
  );
}

export default Tiktok;
