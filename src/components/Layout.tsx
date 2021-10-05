import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import { withPrefix } from '../utils';
import Header from './Header';
// eslint-disable-next-line import/no-cycle
import Footer from './Footer';

const Body = props => {
  const {
    children,
    className,
    data = {},
    page = {},
    showFooter = true,
    showHeader = true,
    type,
  } = props;
  const font = data?.config?.base_font ?? 'nunito-sans';
  const seo = page?.frontmatter?.seo ?? {};
  return (
    <>
      <Helmet>
        <title>
          {
            seo.title
              ? seo.title
              : `${page.frontmatter?.title} | ${data.config?.title}`
          }
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initialScale=1.0" />
        <meta name="google" content="notranslate" />
        <meta
          name="description"
          content={seo?.description || ''}
        />
        {!!seo.robots && (
          <meta
            name="robots"
            content={seo?.robots?.join(',')}
          />
        )}
        {(seo?.canonical_url && seo?.canonical_url !== "lorem-ipsum")
          ? (
            <link
              rel="canonical"
              href={seo?.canonical_url}
            />
          )
          : !!data.config?.domain
            && (() => {
              const domain = _.trim(data.config?.domain, '/');
              // eslint-disable-next-line no-underscore-dangle
              const page_rel_url = withPrefix(page.__metadata?.urlPath);
              return <link rel="canonical" href={domain + page_rel_url} />;
            })()}
        {seo?.extra?.map(
          // eslint-disable-next-line no-nested-ternary, no-confusing-arrow
          (meta, meta_idx) => meta?.name === 'og:image'
            || meta?.name === 'twitter:image' ? (
              meta?.value.startsWith('http') ? (
                <meta
                  key={meta_idx}
                  {...(meta?.name?.startsWith('og:')
                    ? { property: meta?.name }
                    : { name: meta?.name }
                  )
                  }
                  content={meta?.value}
                />
              ) : (
                data.config?.domain
                && (() => {
                  const domain = _.trim(
                    data.config?.domain,
                    '/',
                  );
                  const image_rel_url = withPrefix(meta?.value);
                  return (
                    <meta
                      key={`${meta_idx}.1`}
                      {...(
                        meta?.name?.startsWith('og:')
                          ? { property: meta?.name }
                          : { name: meta?.name }
                        )
                      }
                      content={domain + image_rel_url}
                    />
                  );
                })()
              )
            ) : (
              <meta
                key={`${meta_idx}.2`}
                {...(
                  meta?.name?.startsWith('og:')
                    ? { property: meta?.name }
                    : { name: meta?.name }
                  )
                }
                content={_.get(meta, 'value', null)}
              />
            ),
        )}
        {font !== 'system-sans' && (
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        )}
        {font === 'nunito-sans' ? (
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        ) : (
          font === 'fira-sans' && (
            <link
              href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap"
              rel="stylesheet"
            />
          )
        )}
        {!!data.config?.favicon && (
          <link
            rel="icon"
            href={withPrefix(data.config.favicon)}
          />
        )}
        <body
          className={`palette-${data.config?.palette} font-${data.config?.base_font}`}
        />
      </Helmet>
      <div id="page" className={`site ${className}`}>
        <Header {...props} />
        <main id="content" className="site-content">
          {children}
        </main>
        { !!showFooter && <Footer {...props} /> }
      </div>
    </>
  );
};

export default Body;
