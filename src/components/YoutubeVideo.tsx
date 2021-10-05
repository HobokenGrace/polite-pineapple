import React from 'react';

const YoutubeVideo = (props) => {
  const { title, videoId } = props;
  if (!videoId) return null;
  return (
    <iframe
      title={title}
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default YoutubeVideo;
