import React from 'react';
import _ from 'lodash';

import components from './index';
import FooterNav from './FooterNav';

const Footer = (props) => {
  const { data } = props;
  return (
    <footer id="colophon" className="site-footer">
      {!!data?.config?.footer?.sections
        && _.size(data?.config?.footer?.sections) > 0
        && (
          <div className="footer-top outer">
            <div className="inner">
              <div className="grid footer-widgets">
                {
                  data?.config?.footer?.sections?.map(
                    (section, section_idx) => {
                      const component = _.upperFirst(_.camelCase(section?.type));
                      const Component = components[component];
                      return (
                        <Component
                          key={section_idx}
                          {...props}
                          section={section}
                          site={props}
                        />
                      );
                    },
                  )
                }
              </div>
            </div>
          </div>
        )}
      <div className="footer-bottom outer">
        <div className="inner">
          {!!data?.config?.footer?.has_nav
            && !!data?.config?.footer?.nav_links
            && (
              <div className="footer-nav">
                <FooterNav nav_links={data?.config?.footer?.nav_links} />
              </div>
            )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
