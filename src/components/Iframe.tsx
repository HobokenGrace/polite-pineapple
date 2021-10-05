import React from 'react';

const Iframe = (props) => {
  const {
    height = '480',
    src,
    title,
    width = '100%',
  } = props;
  if (!src) return null;
  return (
    <iframe
      title={title}
      width={width}
      height={height}
      src={src}
      frameBorder="0"
      scrolling="no"
      seamless
      allowFullScreen
    />
  );
};

export default Iframe;
