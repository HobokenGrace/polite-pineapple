/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import { htmlToReact, withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';
import Section from './Section';
import YoutubeVideo from './YoutubeVideo';

const imageWidthMap = {
  small: 368,
  medium: 485,
  large: 660,
};

const renderFeature = (feature, feature_idx) => {
  const {
    actions,
    content,
    image,
    image_alignment,
    image_alt,
    image_size = 'medium',
    text_align,
    title,
    youtube_video,
  } = feature;
  return (
    <div key={feature_idx} className="block-item">
      <div className={[
        'grid',
        `block-image-size-${image_size}`,
        ...image_alignment === 'left' ? ['block-align-image-left'] : [],
      ].join(' ')}>
        {image && (
          <div className="cell block-preview">
            <img src={withPrefix(`${image}?nf_resize=fit&w=${imageWidthMap[image_size]}`)} alt={image_alt} />
          </div>
        )}
        {!!youtube_video?.video_id
          && (
            <div className="cell block-preview">
              <YoutubeVideo videoId={youtube_video.video_id} />
            </div>
          )}
        <div className={`cell block-content text-align-${text_align}`}>
          {title && <h3 className="block-title underline">{title}</h3>}
          <div className="block-copy">
            {markdownify(content)}
          </div>
          {!!actions.length && (
            <div className="block-buttons">
              <CtaButtons actions={actions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SectionFeatures = (props) => {
  const {
    section = {},
    section: {
      features,
      section_id,
      subtitle,
      title,
    },
  } = props;
  return (
    <Section id={section_id} className="features-block" {...section}>
      <div className="block-header inner-small">
        {!!title && (
        <h2 className="block-title">{title}</h2>
        )}
        {!!subtitle && (
        <p className="block-subtitle">
          {htmlToReact(subtitle)}
        </p>
        )}
      </div>
      {!!features?.length && (
        <div className="inner">
          {features.map(renderFeature)}
        </div>
      )}
    </Section>
  );
};

export default SectionFeatures;
