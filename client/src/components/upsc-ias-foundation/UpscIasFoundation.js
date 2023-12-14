import ReactPlayer from 'react-player'
import React,{useState} from 'react';

import "./UpscIasFoundation.css"

import UploadVideo from '../upload-video/UploadVideo';
const TopicCard = ({ imageUrl, title, description, videoUrl }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      {!isFullScreen ? (
        <div className="card-flyer" onClick={handleToggleFullScreen}>
          <div className="text-box">
            <div className="image-box">
              {/* Replace img with ReactPlayer */}
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls
                playing={false} // Set to true if you want the video to start playing automatically
                muted={false} // Set to true if you want the video to be muted
                volume={0.8} // Set the volume level (0 to 1)
              />
            </div>
            <div className="text-container">
              <h6>{title}</h6>
              <p>{description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="fullscreen-video-container" onClick={handleToggleFullScreen}>
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            playing
            onEnded={handleToggleFullScreen}
          />
        </div>
      )}
    </>
  );
};
const UpscIasFoundation = () => {
  const topics = [
    {
      imageUrl: 'https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jp',
      title: 'lecture 01',
      description: 'Introduction | Science And Technology For UPSC 2023 | By Rudra Sir #1',
    videoUrl:'https://firebasestorage.googleapis.com/v0/b/udyog-sarathi.appspot.com/o/videos%2FUntitled%20video%20-%20Made%20with%20Clipchamp%20(1).mp4?alt=media&token=b1b883cf-4fe7-4a2e-b36e-e1f24a3dbc0b'
    
    },
    {
      imageUrl: 'https://cdn.pixabay.com/photo/2018/04/09/19/55/low-poly-3305284_960_720.jpg',
      title: 'Title 02',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    },
    {
      imageUrl: 'https://cdn.pixabay.com/photo/2018/04/06/13/46/poly-3295856_960_720.png',
      title: 'Title 03',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    },
    {
      imageUrl: 'https://cdn.pixabay.com/photo/2018/03/30/15/12/dog-3275593_960_720.jpg',
      title: 'Title 04',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    },{
      imageUrl: 'https://cdn.pixabay.com/photo/2018/04/09/19/55/low-poly-3305284_960_720.jpg',
      title: 'Title 02',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    },
  ];

  return (
    <div id="cards_landscape_wrap-2">
      <UploadVideo/>
      <div className="container">
     
     
        <div className="row">
          {topics.map((topic, index) => (
            <div key={index} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <TopicCard {...topic} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpscIasFoundation;
