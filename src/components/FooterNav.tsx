import React from 'react';

import Action from './Action';

const FooterNav = (props) => {
  const { nav_links } = props;
  return (
    <section className="cell widget widget-nav">
      {!!nav_links && (
      <ul className="menu">
        {nav_links?.map((action, action_idx) => (
          <li key={action_idx} className="menu-item">
            <Action {...props} action={action} />
          </li>
        ))}
      </ul>
      )}
    </section>
  );
};

export default FooterNav;
