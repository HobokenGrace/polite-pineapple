import React from 'react';
import _ from 'lodash';

import {
  htmlToReact, getPages, Link, withPrefix,
} from '../utils';
import useMediaQuery from '../hooks/useMediaQuery';

const renderCarousel = (recent_posts) => (
  <div className="glide">
    <div className="glide__track" data-glide-el="track">
      <ul className="glide__slides">
        {_.map(recent_posts, (post, post_idx) => (
          <li key={post_idx} className="glide__slide cell post">
            <div className="card">
              {post?.frontmatter?.thumb_image && (
                <Link
                  className="post-thumbnail"
                  href={withPrefix(post?.__metadata?.urlPath)}
                >
                  <img
                    src={`${withPrefix(post?.frontmatter?.thumb_image)}?nf_resize=fit&w=341`}
                    alt={post?.frontmatter.thumb_image_alt}
                  />
                </Link>
              )}
              <div className="post-body">
                <header className="post-header">
                  <h3 className="post-title">
                    <Link href={withPrefix(post?.__metadata?.urlPath)}>
                      {post?.frontmatter?.title}
                    </Link>
                  </h3>
                </header>
                <div className="post-excerpt">
                  <p>{post?.frontmatter?.excerpt}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="glide__arrows" data-glide-el="controls">
        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
      </div>
      <div className="glide__bullets" data-glide-el="controls[nav]">
        {_.map(recent_posts, (post, post_idx) => (
          <button key={`story-carousel-bullet-${post_idx}`} className="glide__bullet" data-glide-dir={`=${post_idx}`}></button>
        ))
        }
      </div>
    </div>
  </div>
);

const renderMobileStories = (recent_posts) => (
  <div className="grid post-feed">
    <ul>
      {recent_posts?.filter((post, idx) => idx < 3).map((post, post_idx) => (
        <li key={post_idx} className="cell post">
          <div className="card">
            {post?.frontmatter?.thumb_image && (
              <Link
                className="post-thumbnail"
                href={withPrefix(post?.__metadata?.urlPath)}
              >
                <img
                  src={`${withPrefix(post?.frontmatter?.thumb_image)}?nf_resize=fit&w=341`}
                  alt={post?.frontmatter.thumb_image_alt}
                />
              </Link>
            )}
            <div className="post-body">
              <header className="post-header">
                <h3 className="post-title">
                  <Link href={withPrefix(post?.__metadata?.urlPath)}>
                    {post?.frontmatter?.title}
                  </Link>
                </h3>
              </header>
              <div className="post-excerpt">
                <p>{post?.frontmatter?.excerpt}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    <div className="glide__arrows" data-glide-el="controls">
      <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
      <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
    </div>
    <div className="glide__bullets" data-glide-el="controls[nav]">
      {_.map(recent_posts, (post, post_idx) => (
        <button key={`story-carousel-bullet-${post_idx}`} className="glide__bullet" data-glide-dir={`=${post_idx}`}></button>
      ))
      }
    </div>
  </div>
);

const SectionStories = (props) => {
  const section = props?.section;
  const isDesktop = useMediaQuery('(min-width: 1080px)');
  const display_posts = _.orderBy(
    getPages(props?.pages, '/stories'),
    'frontmatter.date',
    'desc',
  );
  const recent_posts = display_posts.slice(0, 8);
  return (
    <section
      id={section?.section_id}
      className={`block posts-block bg-${section?.background} outer`}
    >
      <div className="block-header inner-small">
        {section?.title && <h2 className="block-title">{section?.title}</h2>}
        {section?.subtitle && (
          <p className="block-subtitle">{htmlToReact(section?.subtitle)}</p>
        )}
      </div>
      <div className="inner stories">
        { isDesktop ? renderCarousel(recent_posts) : renderMobileStories(recent_posts)}
      </div>
    </section>
  );
};

export default SectionStories;
