import React from 'react';

import { htmlToReact, withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';
import YoutubeVideo from './YoutubeVideo';
import Section from './Section';

const SectionContent = (props) => {
  const {
    section = {},
    section: {
      actions,
      image,
      image_alt,
      section_id,
      text_align = 'center',
      title,
      youtube_video,
    },
  } = props;
  const showVideo = !!youtube_video?.video_id;
  return (
    <Section id={section_id} className="text-block" {...section}>
      <div className="inner">
        <div className="block-header inner-small">
          {!!title && (
            <h2 className="block-title">{title}</h2>
          )}
          {section?.subtitle && (
          <p className="block-subtitle">
            {htmlToReact(section?.subtitle)}
          </p>
        )}
        </div>
        <div className="grid">
          {!!section?.image && (
            <div className="cell block-preview">
              <img src={`${withPrefix(image)}?nf_resize=fit&w=750`} alt={image_alt} />
            </div>
          )}
          { showVideo && <YoutubeVideo videoId={youtube_video.video_id} />}
          <div className="cell block-content">
            <div className={`block-copy text-align-${text_align}`}>
              {markdownify(section?.content)}
            </div>
            {!!actions && (
              <div className="block-buttons">
                <CtaButtons {...props} actions={actions} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SectionContent;
