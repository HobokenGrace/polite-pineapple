import React from 'react';
import Section from './Section';
import { htmlToReact } from '../utils';
import CtaButtons from './CtaButtons';

const SectionCta = props => {
  const {
    section = {},
    section: {
      actions,
      // default background that can be overridden  
      background = 'accent',
      title,
      section_id,
      subtitle,
      ...restOfSectionProps
    },
  } = props;
  return (
    <Section 
      id={section_id} 
      className="block cta-block outer"
      {...{ background, ...restOfSectionProps }}
    >
      <div className="inner-large">
        <div className="block-content">
          {!!title && (
            <h2 className="block-title">{title}</h2>
          )}
          {!!subtitle && (
            <p className="block-copy">
              {htmlToReact(subtitle)}
            </p>
          )}
          {actions && (
          <CtaButtons actions={actions} />
          )}
        </div>
      </div>
    </Section>
  );
}

export default SectionCta;