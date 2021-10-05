/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

const Section = (props) => {
  const {
    background,
    background_image = {},
    className,
    section_id,
    style,
    subtitle,
    text_color_style,
    title,
    type,
    ...restOfProps
  } = props;
  
  const {
    bg_image,
    bg_fixed,
  } = background_image;
  const bgImgPath = bg_image?.match(/^http/) ? bg_image : `/${bg_image}`;
  const sectionStyles = {
    ...(!!bg_image && {
      backgroundImage: `url("${bgImgPath}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
    ...(typeof style === 'object' && style),
  };
  const sectionClasses = [
    'block',
    'outer',
    ...bg_fixed ? ['bg-fixed'] : [],
    ...background && !bg_image ? [`bg-${background}`] : [],
    ...text_color_style ? [text_color_style] : [],
    className,
  ];
  return (
    <section
      id={section_id}
      className={sectionClasses.join(' ')}
      style={sectionStyles}
      {...restOfProps}
    />
  );
};

export default Section;
