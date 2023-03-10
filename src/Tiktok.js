import React, { useState } from 'react';
import axios from 'axios';

function Tiktok() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleDownloadClick = () => {
    const options = {
      method: 'GET',
      url: 'https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index',
      params: { url: videoUrl },
      headers: {
        'X-RapidAPI-Key': '5fe8221b2cmshc62b62f1492688dp1d9d5ejsnc517524b5e2d',
        'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com',
      },
    };

    axios.request(options).then(function (response) {
      // Extract the video URL from the JSON response
      const videoUrl = response.data.video[0];

      // Create a new <a> element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = videoUrl;
      downloadLink.download = 'tiktok-video.mp4';

      // Trigger the download by clicking the link
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }).catch(function (error) {
      console.error(error);
    });
  };

  return (
    <div>
      <input type="text" value={videoUrl} onChange={handleInputChange} />
      <button onClick={handleDownloadClick}>Download</button>
    </div>
  );
}

export default Tiktok;
