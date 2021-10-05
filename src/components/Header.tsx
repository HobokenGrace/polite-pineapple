import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, classNames } from '../utils';
import Action from './Action';
const Header = (props) => {
  const { header } = props?.data?.config ?? {}; 
  return (
    <header id="masthead" className="site-header outer">
      <div className="inner">
        <div className="site-header-inside">
          <div className="site-branding">
            {header?.logo_img && (
            <p className="site-logo">
              <a href={withPrefix('/')}>
                <img
                  src={withPrefix(header?.logo_img)}
                  alt={header?.logo_img_alt}
                />
              </a>
            </p>
            )}
            {props?.page?.frontmatter?.template === 'landing' ? (
                  <h1
                    className={classNames('site-title', {
                      'screen-reader-text': header?.logo_img,
                    })}
                  >
                    <a href={withPrefix('/')}>
                      {props?.data?.config?.title}
                    </a>
                  </h1>
              ) : (
                <p
                  className={classNames('site-title', {
                    'screen-reader-text': props?.data?.config?.header?.logo_img,
                  })}
                >
                  <a href={withPrefix('/')}>
                    {props?.data?.config?.title}
                  </a>
                </p>
              )}
          </div>
          {header?.nav_links && header?.has_nav && (
          <>
            <nav
              id="main-navigation"
              className="site-navigation"
              aria-label="Main Navigation"
            >
              <div className="site-nav-inside">
                <button id="menu-close" className="menu-toggle">
                  <span className="screen-reader-text">Open Menu</span>
                  <span className="icon-close" aria-hidden="true" />
                </button>
                <ul className="menu">
                  {_.map(header?.nav_links,
                        (action, action_idx) => {
                          const page_url = _.trim(props?.page?.__metadata?.urlPath, '/');
                          const action_url = _.trim(action?.url, '/');
                          const action_style = action?.style || 'link';
                          return (
                            <li
                              key={action_idx}
                              className={classNames('menu-item', {
                                'current-menu-item': page_url === action_url,
                                'menu-button': action_style !== 'link',
                              })}
                            >
                              <Action {...props} action={action} />
                            </li>
                          );
                        })}
                </ul>
              </div>
            </nav>
            <button id="menu-open" className="menu-toggle">
              <span className="screen-reader-text">Close Menu</span>
              <span className="icon-menu" aria-hidden="true" />
            </button>
          </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
