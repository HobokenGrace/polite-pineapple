/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { htmlToReact, markdownify, withPrefix } from '../utils';

const SectionIconLinks = (props) => {
  const { section } = props;
  if (!section) return '';
  const {
    background,
    section_id,
    icon_style,
    text_align,
  } = section;
  return (
    <section id={section_id} className={`block icon-links-block outer icon-style-${icon_style} bg-${background}`}>
      <div className="block-header inner-small">
        {section?.title && (
          <h2 className="block-title">{section?.title}</h2>
        )}
        {section?.subtitle && (
          <p className="block-subtitle">
            {htmlToReact(section?.subtitle)}
          </p>
        )}
        {section?.content && (
          <div className={`block-copy text-align-${text_align}`}>
            {markdownify(section?.content)}
          </div>
        )}
      </div>
      {section?.items && (
        <div className="inner">
          <div className="grid">
            {section?.items?.map((item, item_idx) => (
              <div key={`${section?.title} icon link ${item_idx}`} className="cell icon-link">
                <div className="card bg-transparent">
                  <a className="icon-link-icon" href={withPrefix(item.url)}>
                    <i className={`fas fa-${item.icon_name || 'check'} fa-lg`} aria-hidden="true" />
                  </a>
                  <div className="icon-link-body">
                    {item.title && (
                      <h4 className="icon-link-title">
                        <a href={withPrefix(item.url)}>
                          {item.title}
                        </a>
                      </h4>
                    )}
                    <p className="icon-link-text">{htmlToReact(item.description)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionIconLinks;
