import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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

    axios
      .request(options)
      .then(function (response) {
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
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleDownloadVideo = () => {
    if (videoUrl === '') {
      Swal.fire({
        icon: 'error',
        text: 'Please enter a TikTok video URL',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to download this video?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, download it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDownloadClick();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The download was cancelled', 'info');
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter TikTok video URL"
          value={videoUrl}
          onChange={handleInputChange}
          className="border rounded py-2 px-3"
        />
      </div>
      <button onClick={handleDownloadVideo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download
      </button>
    </div>
  );
}

export default Tiktok;
