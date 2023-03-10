import React, { useState } from "react";
import axios from "axios";

function Tiktok() {
  const [videoUrl, setVideoUrl] = useState("");

  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleDownloadClick = async () => {
    const options = {
      method: "GET",
      url:
        "https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index",
      params: { url: videoUrl },
      headers: {
        "X-RapidAPI-Key": "5fe8221b2cmshc62b62f1492688dp1d9d5ejsnc517524b5e2d",
        "X-RapidAPI-Host":
          "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
      },
      responseType: "blob", // set response type to blob to download the file
    };

    try {
      const response = await axios.request(options);
      console.log(response);

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers["content-type"] })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "video.mp4"); // set filename for download
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <input type="text" value={videoUrl} onChange={handleUrlChange} />
      <button onClick={handleDownloadClick}>Download</button>
    </div>
  );
}

export default Tiktok;
