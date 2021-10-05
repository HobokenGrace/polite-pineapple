import React from 'react';
import Section from './Section';

const Quotation = (props) => {
  const { section } = props;
  return (
    <Section id={section?.section_id} className="text-block" {...section}>
      <div className="inner">
        <h2 className="block-title">{section?.quote}</h2>
        <div className="block-copy">
          {section?.citation}
        </div>
      </div>
    </Section>
  );
};

export default Quotation;
