import React from 'react';

import { Layout } from '../components/index';
import { htmlToReact, withPrefix, markdownify } from '../utils';

const Page = (props) => {
  const { page } = props;
  if (!page) return '';
  return (
    <Layout {...props}>
      <div className="outer">
        <div className="inner-medium">
          <article className="post post-full">
            <header className="post-header">
              <h1 className="post-title">{page.frontmatter?.title}</h1>
              {page.frontmatter?.subtitle && (
                <div className="post-subtitle">
                  {htmlToReact(page.frontmatter?.subtitle)}
                </div>
              )}
            </header>
            {page.frontmatter?.image && (
            <div className="post-image">
              <img src={`${withPrefix(page.frontmatter?.image)}?nf_resize=fit&w=750`} alt={page.frontmatter?.image_alt} />
            </div>
            )}
            <div className="post-content">
              {markdownify(page.markdown)}
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
