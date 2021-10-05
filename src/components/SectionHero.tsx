/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';
import Section from './Section';
import YoutubeVideo from './YoutubeVideo';

const SectionHero = (props) => {
  const { section = {} } = props;
  const {
    actions,
    className,
    content,
    image,
    image_alt,
    image_under_content,
    section_id,
    title,
    youtube_video,
    video,
    video_poster,
    ...restOfProps
  } = section;

  const sectionClasses = [
    'hero-block',
    ...image_under_content ? ['image-under-content'] : [],
    ...(!!video || image_under_content) ? ['media-under-content'] : [],
    className,
  ];

  const showVideo = !!youtube_video?.video_id;

  return (
    <Section
      id={section_id}
      className={sectionClasses.join(' ')}
      {...restOfProps}
    >
      {video && (
        <video playsInline autoPlay muted loop poster={withPrefix(video_poster)} id="bgvideo" src={video} width="100%" height="y">
          <source src={video} type="video/mp4" />
        </video>
      )}
      {image && image_under_content && (
        <img src={withPrefix(image)} alt={image_alt} />
      )}
      <div className="inner">
        <div className="grid">
          {image && !image_under_content && (
            <div className="cell block-preview">
              <img src={`${withPrefix(image)}?nf_resize=fit&w=360`} alt={image_alt} />
            </div>
          )}
          { showVideo && <YoutubeVideo videoId={youtube_video.video_id} />}
          {(!!title || !!content?.length || !!actions?.length) && (
            <div className="cell block-content">
              {title && (
                <h1 className="block-title underline">{title}</h1>
              )}
              <div className="block-copy">
                {markdownify(content)}
              </div>
              {!!actions?.length && (
                <div className="block-buttons">
                  <CtaButtons {...props} actions={actions} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default SectionHero;
