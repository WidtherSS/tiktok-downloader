import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
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

    axios.request(options).then(function (response) {
      // Extract the video URL from the JSON response
      const videoUrl = response.data.video[0];

      // Download the video using FileSaver
      saveAs(videoUrl, 'tiktok-video.mp4');

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'The video has been downloaded successfully.',
        text: 'you can thank me by calling me DADDY Adam'
      });
    }).catch(function (error) {
      console.error(error);

      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    });
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="text-4xl text-center mb-6">Put the link here:</h1>
      <div className="flex flex-row">
        <input
          className="flex-grow bg-gray-200 rounded-l-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          value={videoUrl}
          onChange={handleInputChange}
          placeholder="insert your link here:"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
          onClick={handleDownloadClick}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Tiktok;
