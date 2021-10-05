import React from 'react';

import CtaButtons from './CtaButtons';
import { markdownify, htmlToReact, withPrefix } from '../utils';
import Iframe from './Iframe';
import YoutubeVideo from './YoutubeVideo';
import Section from './Section';

const SectionCols = (props) => {
  const { section } = props;
  const {
    columns,
    icon_style,
    ...restOfSectionProps
  } = section;
  return (
    <Section className={`cols-block num-cols-${columns?.length}} icon-style-${icon_style}`} {...restOfSectionProps}>
      <div className="block-header inner-medium">
        {section?.title && (
          <h2 className="block-title">{section?.title}</h2>
        )}
        {section?.subtitle && (
          <p className="block-subtitle">
            {htmlToReact(section?.subtitle)}
          </p>
        )}
      </div>
      {!!columns && (
        <div className="inner">
          <div className="grid">
            { section?.columns?.map((col, idx) => {
              const {
                actions,
                icon_name,
                iframe,
                image_alt,
                image_url,
                is_card,
                markdown,
                text_align,
                title,
                title_url,
                youtube_video,
              } = col;
              return (
                <div key={`${section?.title} col ${idx}`} className={`col ${(is_card ? 'card ' : '')}${(icon_name ? 'with-icon ' : '')} text-align-${text_align}`}>
                  <div className="col-body">
                    { !!icon_name
                      && (
                      <div className={`icon-link-icon`}>
                        { title_url
                          && (
                          <a href={withPrefix(title_url)}>
                            <i className={`fas fa-${icon_name || 'check'} fa-lg`} aria-hidden="true" />
                          </a>
                          )}
                        { !title_url && <i className={`fas fa-${icon_name || 'check'} fa-lg`} aria-hidden="true" />}
                      </div>
                      )}
                    { !!title
                      && (
                      <h4 className="col-title">
                        { title_url
                          && (
                          <a href={withPrefix(title_url)}>
                            {title}
                          </a>
                          )}
                        {!title_url && title}
                      </h4>
                      )}

                    { !!image_url && image_url !== 'lorem-ipsum' && (
                      <div className="block-preview">
                        <img src={withPrefix(`${image_url}?nf_resize=fit&w=600`)} alt={image_alt} />
                      </div>
                    )}

                    { !!youtube_video?.video_id
                      && <YoutubeVideo videoId={youtube_video.video_id} />}

                    { !!iframe?.src
                      && <Iframe src={iframe.src} />}
                    {markdownify(markdown)}
                    {!!actions.length
                      && (
                      <div className="block-buttons">
                        <CtaButtons {...props} actions={actions} />
                      </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Section>
  );
};

export default SectionCols;
